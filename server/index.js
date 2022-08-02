const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const twitchGets = require('./twitchGets');

async function makeVideo() {
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

  top10Clips.forEach((item, i) => {
    let filename = `clip${i+1}`;
    let URL_CLIP = item.thumbnail_url.replace('-preview-480x272.jpg', '.mp4');
  
    downloadClipLocal(URL_CLIP, filename)
  })
}

function downloadClipLocal (url, filename){
  fs.mkdir(`../downloads/`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const file = fs.createWriteStream(`../downloads/${filename}.mp4`);
  const request = https.get(url, function(response) {
     response.pipe(file);
  
     // after download completed close filestream
     file.on("finish", () => file.close());
  })
  console.log(`Video '${filename}' salvo com sucesso!`)
}

makeVideo()