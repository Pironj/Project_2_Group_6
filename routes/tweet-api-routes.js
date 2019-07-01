// // Requiring our models
// var db = require("../models");
// var db = require("../models"); //you will need this in order to do db lookups

// module.exports = function(app) {
//   app.get("/api/tweets/", function(req, res) {
//     //this api route just shows all tweets in the db
//     db.Tweet.findAll({})
//       .then(function(tweets) {
//         res.json(tweets);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });

//   //this is the create route that will make a tweet and ensure the right user's info is in there
//   app.post("/api/tweets/", function(req, res) {
//     console.log(req.body);

//     db.Tweet.create({
//       tweetId: req.body.tweetId,
//       UserId: req.body.UserId //NOTE: because sequelize did the autocapitalize thing, the key on this object must be UserId
//     })
//       .then(function(result) {
//         res.json(result);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });
//   });

//   //AN EXAMPLE PROTECTED API ROUTE
//   app.get("/api/users/:id", function(req, res) {
//     //We only want users to retrieve data if they are logged in

//     //first, see if anyone is logged in, period
//     if (req.session.token) {
//       console.log("=== CALLING API TO FIND ONE USER === ");
//       //next, see if the person logged in matches the id in the params
//       if (parseInt(req.session.userid) === parseInt(req.params.id)) {
//         db.User.findOne({
//           where: {
//             id: req.session.userid
//           }
//         })
//           .then(function(user) {
//             res.json(user);
//           })
//           .catch(function(err) {
//             res.sendStatus(500);
//           });
//       } else {
//         res.sendStatus(400); //whoops!  this was a bad request
//       }
//     } else {
//       //otherwise, tell the visitor they can't retrieve data (not logged in)
//       res.sendStatus(403);
//     }
//   });
// };

var db = require("../models");

module.exports = function(app) {
  // Get all examples (by a certain user)
  app.get("/api/tweets", function(req, res) {
    console.log("======== CURRENT STATE OF THE SESSION ==========");
    console.log(req.session);
    db.Tweet.findAll({ where: { UserId: req.session.userid } }).then(function(
      dbTweets
    ) {
      res.json(dbTweets);
    });
  });

  // Create a new example -- authored by a specific logged-in user
  app.post("/api/tweets", function(req, res) {
    if (!req.session.token) {
      //if you aren't logged in, you can't post things :)
      return res.sendStatus(403);
    }

    db.Tweet.create({
      tweetId: req.body.tweetId,
      // description: req.body.description,
      UserId: req.session.userid
    }).then(function(dbTweet) {
      res.json(dbTweet);
    });
  });

  // Delete an example by id
  app.delete("/api/tweets/:id", function(req, res) {
    db.Tweet.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
