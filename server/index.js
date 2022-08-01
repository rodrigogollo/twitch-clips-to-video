const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const twitchGets = require('./twitchGets');

async function makeVideo() {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let gameData = await twitchGets.getGameByName('csgo');
  let getClipData = await twitchGets.getClipsByGame(gameData.data[0].id, 1, yesterday, today);

  const broadcaster = await getClipData.data[0].broadcaster_name
  const URL_CLIP = await getClipData.data[0].thumbnail_url.replace('-preview-480x272.jpg', '.mp4');

  fs.mkdir(`./downloads/`, { recursive: true }, (err) => {
    if (err) throw err;
  });
  
  const file = fs.createWriteStream(`./downloads/${broadcaster}.mp4`);
  const request = https.get(URL_CLIP, function(response) {
     response.pipe(file);
  
     // after download completed close filestream
     file.on("finish", () => {
         file.close();
         console.log("Download Completed");
     });
  })
}
makeVideo()