// NOT USED CONVERTED TO TWEET-API AND USER-API

// var db = require("../models");

// module.exports = function(app) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
// };



var trendTopics = [];
var trendTopicsList = [];
var tweetIds = [];
var created_at = [];
var content = [];
var hashtags = [];
var name = [];
var handle = [];
var id_strings = [];
var urls = [];
var flag = true;
const numOfTrending = 1;
const numOfTweets = 1;
var test = "";
var test1 = "";
var html = "";
var T = new Twit({
  consumer_key: 'q0FiTHT26bJxIjldXF8g2EDVw',
  consumer_secret: 'WEBBW8erGtCBKA1gCDp8YCNpqTBLSkx3zwek0M0gdSE6gs3dYQ',
  access_token: '1136480334088814592-KHSFeLe6UTjEuavcNvrtZHTCZBEMfM',
  access_token_secret: 'zSpivL6RbF9pjCOisQqB5klBpB8fLC1S5iu27Sai1m1mv',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})


// This function will query Twitter and return 50 trending topics (just the name of those topics)
function trendSearch() {
  T.get('trends/place', { id: '2490383' }, function (err, data, response) {
    for (let i = 0; i < data[0].trends.length; i++) {
      trendTopics.push(data[0].trends[i].name);
    }
    for (let j = 0; j < numOfTrending; j++) {
      topicSearch(trendTopics[j]);
    }
  })
}

// This function will input a single topic search and output the Tweet ID associated with that specific topic
function topicSearch(topic) {
  T.get('search/tweets', { q: topic, count: numOfTweets, result_type: 'popular' }, function (err, data, response) {
    console.log(topic)
    
    for (let i = 0; i < numOfTweets; i++) {
      id_strings[i] = data.statuses[i].id_str
    }
    console.log(id_strings)
  })
}

// This function will input a handle and output the Tweet ID associated with x number of tweets from this user
function authorSearch(author) {
  T.get('statuses/user_timeline', { screen_name: author, count: numOfTweets }, function (err, data, response) {
    for (let i = 0; i < numOfTweets; i++) {
      id_strings[i] = data[i].id_str;
    }
    console.log(id_strings);
  })
}

// Test each input type
// trendSearch();
// topicSearch('Iran')
// authorSearch('UW_MBB')