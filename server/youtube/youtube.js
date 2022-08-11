const fs = require('fs');
const readline = require('readline');
const assert = require('assert');
const { google } = require('googleapis');
const { inherits } = require('util');
const OAuth2 = google.auth.OAuth2;
const args = require('minimist')(process.argv.slice(2));

const renderURL = args.renderURL || 'https://s3.us-east-1.amazonaws.com/remotionlambda-51ph4zifjl/renders/e1vycpoer8/out.mp4';
const thumbFilePath = '../../out/thumb.png';
const videoFilePath = '../../out/video.mp4';

const CLIENT_SECRETS_FILE = require('./client_secrets.json');
const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

const init = (title, description, tags) => {
  
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS_FILE.web.client_id,
    CLIENT_SECRETS_FILE.web.client_secret,
    CLIENT_SECRETS_FILE.web.redirect_uris
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('url', url)

  // const {tokens} = await oauth2Client.getToken(code)
  // oauth2Client.setCredentials(tokens);

  // const youtubeService = google.youtube({version: 'v3', auth: authClient });

  // uploadVideo(youtubeService, auth, title, description, tags)
};

function uploadVideo(service, auth, title, description, tags) {
  
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

function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

// uploadVideo('title test', 'description test', ['twitch', 'game'])
init('title test', 'description test', ['twitch', 'game'])