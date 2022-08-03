const express = require('express');
const app = express();
const serverFunctions = require('./index.js');
const { asyncWrapper } = require('../utils');

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/make', (req, res) => {
  let clips = asyncWrapper(serverFunctions.makeVideo())
  res.send('All clips downloaded locally', clips);
})

app.listen(5000, () => {
  console.log('server listening to port 5000')
})


