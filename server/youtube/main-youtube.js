fs.readFile('client_secret.json', (error, content) => {
  if (error) {
      console.log('Error loading client secret file: ' + error);
      return cb(error);
  }
  // Authorize a client with the loaded credentials
  authorize(JSON.parse(content), cb);
});