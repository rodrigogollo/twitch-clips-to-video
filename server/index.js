const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');
const twitchGets = require('./twitchGets');
const cliProgress = require('cli-progress');
const { asyncWrapper } = require('../utils');

const args = require('minimist')(process.argv.slice(2));

// node index.js func= (game || broadcaster) name= (csgo || imaqtpie) size=10 (clips size) date= (day, week, month)

// let progressBarList = {}

// let multibar = new cliProgress.MultiBar({
//   clearOnComplete: false,
//   hideCursor: true
// }, cliProgress.Presets.legacy);

async function makeVideo() {

  asyncWrapper(clearFolder(__dirname + `/../downloads/`));

  let today = new Date();
  let yesterday = new Date();
  let twodays = new Date();
  let week = new Date();
  let month = new Date();

  yesterday.setDate(today.getDate() - 1);
  twodays.setDate(today.getDate() - 2);
  week.setDate(today.getDate() - 7);
  month.setMonth(today.getMonth() - 1);

  today.setHours(0,0,0,0);
  yesterday.setHours(0,0,0,0);
  twodays.setHours(0,0,0,0);
  week.setHours(0,0,0,0);
  month.setHours(0,0,0,0);

  let gameData, getClipData;

  let func = args.func || 'game';
  let name = args.name || 'csgo';
  let size = args.size || 15;
  let date = args.date;

  switch(date) {
    case 'day': date = yesterday
    break;
    case 'twodays': date = twodays
    break;
    case 'week': date = week
    break;
    case 'month': date = month
    break;
    default: date = yesterday
  }

  if(func == 'game') {
    gameData = await twitchGets.getGameByName(name);
    getClipData = await twitchGets.getClipsByGame(gameData.data[0].id, 100, date, today);
  } else {
    streamerData = await twitchGets.getUserByLogin(name);
    getClipData = await twitchGets.getClipsByBroadcaster(streamerData.data[0].id, 100, date, today);
  }

  let durationAllVideos = 0;

  let clipsFiltered = getClipData.data.filter(item => (
    item.language == 'en' 
    && item.duration >= 25
  ))
  let uniqueStreamerClips;

  if(func != 'game'){
    uniqueStreamerClips = clipsFiltered
  } else {
    uniqueStreamerClips = clipsFiltered.filter((value, index, self) => index === self.findIndex((t) => (
      t.broadcaster_name === value.broadcaster_name
    )))
  }

  let topClips = uniqueStreamerClips.slice(0, size)
  let clipList = []; 

  topClips.forEach((item, i) => {
    durationAllVideos += item.duration;
    let filename = `clip${i+1}`;
    let URL_CLIP = item.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');

    clipList.push({
      video: `${filename}.mp4`,
      data: item
    })

    //Object.assign(progressBarList, {[filename]: multibar.create(100, 0)})

    asyncWrapper(downloadClipLocal(URL_CLIP, filename))
  })
  console.log('Total Duration: ', durationAllVideos)
  writeClipListToJSON(clipList)

  return topClips;
}

function downloadClipLocal (url, filename){
  
  fs.mkdir(__dirname + `/../downloads/`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const file = fs.createWriteStream(__dirname + `/../downloads/${filename}.mp4`);
  const request = https.get(url, function(response) {
     response.pipe(file);
     // after download completed close filestream
     file.on("finish", () => {
      console.log(`Video '${filename}' salvo com sucesso!`);
      file.close()
     });
  })

  /* conversion mp4 to webm works but not worth (time consuming for conversion and video build still slow) */

  // var infs = new ffmpeg

  // infs.addInput(url).output(__dirname + `/../downloads/${filename}.webm`)
  // .on('start', function (commandLine) {
  //   progressBarList[filename].start(99.99, 0.00);
  //   console.log('Iniciou download do arquivo: ' + filename);
  // })
  // .on('error', function (err, stdout, stderr) {
  //     console.log('Erro ao baixar o arquivo: ' + err.message, err, stderr);
  // })
  // .on('progress', function (progress) {
  //   //console.log(`Processando Arquivo '${filename}': ` + progress.percent.toFixed(2) + '% done')
  //   progressBarList[filename].update(Math.round((progress.percent + Number.EPSILON) * 100) / 100);
  // })
  // .on('end', function (err, stdout, stderr) {
  //   progressBarList[filename].stop();
  //   console.log(`Video '${filename}' salvo com sucesso!`);
  // })
  // .run()

}

function writeClipListToJSON(clipList){
  const clipListJSON = JSON.stringify({clips: clipList})
  const file = fs.writeFileSync(__dirname + `/../downloads/clips.json`, clipListJSON);
}

//makeVideo()

async function getVideos() {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let gameData = await twitchGets.getGameByName('multiversus');
  let getClipData = await twitchGets.getClipsByGame(gameData.data[0].id, 100, yesterday, today);

  let clipsEN = getClipData.data.filter(item => item.language == 'en')

  let uniqueStreamerClips = clipsEN.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.broadcaster_name === value.broadcaster_name
  )))

  let top10Clips = uniqueStreamerClips.slice(0, 20)

  let top10URLS = [];

  top10Clips.forEach((item, i) => {
    let filename = `clip${i+1}`;
    let URL_CLIP = item.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
  
    top10URLS.push(URL_CLIP);
  })
  return top10URLS;
}

function clearFolder(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

module.exports = {
  makeVideo
  //getVideos
}