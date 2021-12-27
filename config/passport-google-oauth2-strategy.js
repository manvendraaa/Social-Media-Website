const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// crypto for random password generation
const crypto = require('crypto');
const User = require('../models/user');



//tell ps to use new googlestrategy
passport.use(new googleStrategy({
        clientID: "720574704081-l8m8638l4kgme5lve8b1jssr6lhf61vd.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //find a user 
        User.findOne({email : profile.emails[0].value}).exec(function (err,user){
            if(err){
                console.log(err);
                return;
            }
            console.log(profile);
            if(user){
                // if user found in our db then set user as req.user
                return done(null, user);
            }else{
                // else create the user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        // if err in creating user
                        console.log(err);
                        return ;
                    }else{
                        // return the created user
                        return done(null, user);
                    }
                })
            }

        })
    }
))
module.exports = passport;