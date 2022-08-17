const fs = require('fs');
const https = require('https');
const args = require('minimist')(process.argv.slice(2));
require('dotenv').config({path: __dirname + '/../../.env' })

const { google } = require('googleapis');

const renderURL = args.renderURL || 'https://s3.us-east-1.amazonaws.com/remotionlambda-51ph4zifjl/renders/e1vycpoer8/out.mp4';
const thumbFilePath = '../../out/thumb.png';
const videoFilePath = '../../out/outputAWS.mp4';

console.log('videoFilePath', videoFilePath)
const TOKEN_PATH = '../tokens.json';
const CLIENT_SECRETS_FILE = require('./client_secrets.json');
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

const code = process.env.GOOGLE_API_CODE;

const init = (title, description, tags) => {

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS_FILE.web.client_id,
    CLIENT_SECRETS_FILE.web.client_secret,
    CLIENT_SECRETS_FILE.web.redirect_uris
  );
  
  if(code == '') {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      include_granted_scopes: true,
      response_type: 'code',
      approval_promp: 'force',
      scope: SCOPES
    });
  
    console.log('URL: ', url);
  } else {
    // console.log('code: ', code);

    // oauth2Client.getToken(code)
    // .then(response => {
    //   console.log(response.tokens)

    //   if (response.tokens.refresh_token) {
    //     // store the refresh_token in my database!
    //     storeToken(response.tokens);
    //     console.log('refresh_token: ', response.tokens.refresh_token);
    //   }
    //   console.log('access_token: ', response.tokens.access_token);
    // });
  }
  const token = require(TOKEN_PATH);
  
  oauth2Client.setCredentials(token);

  const youtubeService = google.youtube({version: 'v3', auth: oauth2Client });
  uploadVideo(youtubeService, oauth2Client, title, description, tags)
};

function uploadVideo(service, auth, title, description, tags) {
  const videoStream = https.get(renderURL, res => res.pipe(fs.createWriteStream('../../out/outputAWS.mp4')))

  service.videos.insert({
    auth: auth,
    part: 'snippet,status',
    requestBody: {
      snippet: {
        title,
        description,
        tags,
        categoryId: "24",
        defaultLanguage: 'en',
        defaultAudioLanguage: 'en'
      },
      status: {
        privacyStatus: 'private'
      },
    },
    media: {
      body: fs.createReadStream(videoFilePath)
      // body: https.get(renderURL, res => res.pipe(fs.createWriteStream('out.mp4')))
    },
  }, function(err, response) {
    if(err) {
      console.log('The API returned an error: ', err);
      return;
    }
    console.log(response.data);

    console.log('Video uploaded. Uploading the thumbnail now.');
    service.thumbnails.set({
      auth: auth,
      videoId: response.data.id,
      media: {
        body: fs.createReadStream(thumbFilePath)
      },
    }, function(err, response){
      if(err){
        console.log('The API returned an error: ', err);
        return;
      }
      console.log(response.data);
    })
  });
}

function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

// init('title test', 'description test', ['twitch', 'game'])