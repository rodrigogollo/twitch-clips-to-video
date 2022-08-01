const axios = require('axios').default;
require('dotenv').config({path:__dirname+'/../.env'})

const token = require('./token');

let ACCESS_TOKEN;

async function getGameByName(name) {
  if(ACCESS_TOKEN == undefined) ACCESS_TOKEN = await token.getToken()
  try {
    let res = await axios.get('https://api.twitch.tv/helix/games', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN} `,
        'Client-Id': process.env.CLIENT_ID
      },
      params: {
        name
      }
    })
    if(res.status == 200) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserByLogin(login) {
  if(ACCESS_TOKEN == undefined) ACCESS_TOKEN = await token.getToken()
  try {
    let res = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN} `,
        'Client-Id': process.env.CLIENT_ID
      },
      params: {
        login
      }
    })
    if(res.status == 200) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}


async function getClipsByBroadcaster(broadcaster_id, first, started_at, ended_at) {
  if(ACCESS_TOKEN == undefined) ACCESS_TOKEN = await token.getToken()
  try {
    let res = await axios.get('https://api.twitch.tv/helix/clips', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN} `,
        'Client-Id': process.env.CLIENT_ID
      },
      params: {
        broadcaster_id,
        first,
        started_at,
        ended_at
      }
    })
    if(res.status == 200) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getClipsByGame(game_id, first, started_at, ended_at) {
  if(ACCESS_TOKEN == undefined) ACCESS_TOKEN = await token.getToken()
  try {
    let res = await axios.get('https://api.twitch.tv/helix/clips', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN} `,
        'Client-Id': process.env.CLIENT_ID
      },
      params: {
        game_id,
        first,
        started_at,
        ended_at
      }
    })
    if(res.status == 200) {
      console.log(res.data)
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// getGameByName('csgo')
// getUserByLogin('jerma985')
getClipsByBroadcaster(23936415, 10, '2022-07-26T00:00:00Z', new Date())