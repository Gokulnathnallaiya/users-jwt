const express = require("express");
const cors = require("cors");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

let user = {};
passport.serializeUser(function (user, cb) {
  console.log("I should have jack ");
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  console.log("I wont have jack shit");
  cb(null, obj);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "187895093455-eqss0arll7079s387dhojlqibovcs322.apps.googleusercontent.com",
      clientSecret: "LD8Iu8TyGqwPVH64l3lzpLfg",
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(accessToken, refreshToken, profile)
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED");
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
