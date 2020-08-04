const express = require('express');
const app = express();
const GoogleAuth = require('simple-google-openid');

// you can put your client ID here
app.use(GoogleAuth(process.env.GOOGLE_CLIENT_ID));
 
// return 'Not authorized' if we don't have a user
app.use('/api', GoogleAuth.guardMiddleware(), require('./api'));
 
// this will serve the HTML file shown below
app.use(express.static('static', { extensions: ['html'] }));
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});