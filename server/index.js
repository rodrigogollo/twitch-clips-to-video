const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

fs.mkdir('./downloads/', { recursive: true }, (err) => {
  if (err) throw err;
});

const file = fs.createWriteStream("./downloads/clip1.mp4");
const request = https.get("https://clips-media-assets2.twitch.tv/JQVcIboKkAjc_Isyy0RbBA/AT-cm%7CJQVcIboKkAjc_Isyy0RbBA.mp4", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
})