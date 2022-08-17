const fs = require('fs');
const readline = require('readline');
const args = require('minimist')(process.argv.slice(2));
require('dotenv').config({path: __dirname + '/../../.env' })

const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const renderURL = args.renderURL || 'https://s3.us-east-1.amazonaws.com/remotionlambda-51ph4zifjl/renders/e1vycpoer8/out.mp4';
const thumbFilePath = '../../out/thumb.png';
const videoFilePath = '../../out/video.mp4';

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
    console.log('code: ', code)
    
    oauth2Client.getToken(code)
    .then(tokens => {
      oauth2Client.setCredentials(tokens);
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        storeToken(token);
        console.log('refresh_token: ', tokens.refresh_token);
      }
      console.log('access_token: ', tokens.access_token);
    });
  }
  
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

  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    storeToken(token);
    callback(oauth2Client);
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