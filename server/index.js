const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const twitchGets = require('./twitchGets');

async function makeVideo() {
  let today = new Date();
  let yesterday = new Date();
  let daysBefore = new Date();
  let week = new Date();
  let month = new Date();

  yesterday.setDate(today.getDate() - 1);
  daysBefore.setDate(today.getDate() - 2);
  week.setDate(today.getDate() - 7);
  month.setMonth(today.getMonth() - 1);

  today.setHours(0,0,0,0);
  yesterday.setHours(0,0,0,0);
  daysBefore.setHours(0,0,0,0);
  week.setHours(0,0,0,0);
  month.setHours(0,0,0,0);

  // let gameData = await twitchGets.getGameByName('just chatting');
  // let getClipData = await twitchGets.getClipsByGame(gameData.data[0].id, 100, yesterday, today);
  let streamerData = await twitchGets.getUserByLogin('pokelawls');
  let getClipData = await twitchGets.getClipsByBroadcaster(streamerData.data[0].id, 100, month, today);

  let durationAllVideos = 0;

  let clipsFiltered = getClipData.data.filter(item => (
    item.language == 'en' 
    && item.duration >= 25
  ))

  // let uniqueStreamerClips = clipsFiltered.filter((value, index, self) =>
  //   index === self.findIndex((t) => (
  //     t.broadcaster_name === value.broadcaster_name
  // )))

  let topClips = clipsFiltered.slice(0, 15)
  console.log(topClips)

  topClips.forEach((item, i) => {
    durationAllVideos += item.duration;
    let filename = `clip${i+1}`;
    let URL_CLIP = item.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
  
    downloadClipLocal(URL_CLIP, filename)
  })
  console.log('Total Duration: ', durationAllVideos)
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
  
}

makeVideo()


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

module.exports = {
  getVideos
}