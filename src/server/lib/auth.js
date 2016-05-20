import passport from 'koa-passport';

// Can't get google strategy to work
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// passport.use('google', new GoogleStrategy({
    // clientID:     process.env.GOOGLE_CLIENT_ID,
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/auth/google/callback"
  // },
  // function(accessToken, refreshToken, profile, done) {
    // let user = profile;
    // return done(null, user);
  // }
// ));

var GithubStrategy = require('passport-github').Strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/github/callback'
  },
  function(token, tokenSecret, profile, done) {
    let user = profile;
    console.log("gets here");
    if(user.username === process.env.GITHUB_USER){
      console.log(user);
      return done(null, user)
    }
    else {
      return done({error: 'access denied'}, null);
    }
  }
))
passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

export default passport;
