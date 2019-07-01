var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log("==== CURRENT STATE OF THE SESSION =====");
    console.log(req.session);
    if (req.session.token) {
      res.render("index");
      // User is authenticated on google, load app
      // db.Tweet.findAll({ where: { UserId: req.session.passport.user.id } }).then(function (dbExamples) {
      //   res.cookie('token', req.session.token); // Send session token back to client
      //   res.render("index", {
      //     msg: "Welcome!",
      //     tweets: dbExamples
      //   });
      // });
    } else {
      // User is not authenticated, render login page
      res.cookie('token', '');
      req.session = null;
      res.render("login");
    }
  });

  // Logout route
  app.get('/logout', (req, res) => {
    req.logout(); // Call passport logout method
    req.session = null; // Remove session
    res.redirect('/'); // Redirect to index route which will show them login template
  });

  app.get('/trending', (req, res) => {
    res.render("trending");
  });

  // Load example page and pass in an example by id
  app.get("/tweet/:id", function (req, res) {
    db.Tweet.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        tweet: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};