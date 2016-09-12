const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const config = require('./webpack.config.dev');
const assert = require('assert');

/* ---------------- MONGOOSE DB --------- */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tweeter');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB using Mongoose!')
});
const tweetSchema = mongoose.Schema({
    userName: String,
    handle: String,
    content: String,
    createDate: String,
});

var Tweet = mongoose.model('Tweet', tweetSchema);

const userSchema = mongoose.Schema({
    userName: String,
    handle: String,
    password: String,
});

var User = mongoose.model('User', userSchema);

/* -------------- EXPRESS SERVER CODE ------------ */

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Send files no matter what
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tweets', (req, res) => {
  Tweet.find((err, tweets) => {
    if (err) return console.error(err);
    res.send(JSON.stringify(tweets));    
  })
});

// POST request for new tweets
app.post('/tweet', (req, res) => {
  console.log('Got a tweet!', req.body);
  // Save tweet to DB
  var newTweet = new Tweet({
    userName: req.body.tweet.userName,
    handle: req.body.tweet.handle,
    content: req.body.tweet.content,
    createDate: req.body.tweet.createDate,
  });
  newTweet.save((err, tweet) => {
    if (err) return console.error(err);
    Tweet.find((err, tweets) => {
      if (err) return console.error(err);
      res.send(JSON.stringify(tweets));    
    });    
  });
});


app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
