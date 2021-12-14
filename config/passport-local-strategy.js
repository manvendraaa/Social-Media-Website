const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"  
    },
    //email and password will be passed on to the passport for checking
    function(email,password,done){
        // find a user and establish identity
        User.findOne({email : email},function(err,user){
            if(err){
                console.log('error in finding the user -> passport');
                return done(err); // done takes 2 parameters err,user/false -> authenticated or not
            }
            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false)
            }
            return done(null, user);
        })
    }
));

//serialize user -> key send karna to the cookies
passport.serializeUser(function(user,done){
    done(null, user.id)
})

//deserialize user -> aane waali key ko verify with the db
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log('error in deserializing user');return done(err);}
        return done(err,user);
    })

});

// check if the req is coming from authenticated user
passport.checkAuthentication = function(req,res,next){
    // if signed in pass to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

// for setting authenticated user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains current user and we send this to the views locals
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
