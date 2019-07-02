var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var db = require("../models");
require("dotenv").config();
// var keys = require("./keys_google");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/auth/google/callback" // Needs to be changed with final hosted url for production
      },
      function (accessToken, refreshToken, profile, done) {
        // Create user in User table. Add other columns as needed.
        db.User.findOrCreate({ where: { googleId: profile.id }, defaults: { displayName: profile.displayName } })
          .then(function (user) {
              console.log(user);
            console.log("===== FOUND THE USER IN OUR DB! =======");
            console.log("User id: " + user[0].id); // this is the user id (as it is found in our db)
            return done(null, {
              id: user[0].id,
              token: accessToken
            });
          });
      }
    )
  );
};
