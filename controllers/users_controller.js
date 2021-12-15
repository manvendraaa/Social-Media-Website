const User = require('../models/user');

module.exports.profile = (req, res) => {
  User.findById(req.params.id,(err,user)=>{
    return res.render("user_profile", {
      title: "profile",
      profile_user: user
    });
  })
  
};

module.exports.signIn = (req,res) => {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in');
}

module.exports.signUp = (req,res) => {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up');
}

// sign up form action
module.exports.create = function(req, res){
  

  if (req.body.password != req.body.confirm_password){
      return res.redirect('back');
  }

  User.findOne({email: req.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing up'); return}

      if (!user){
          User.create(req.body, function(err, user){
              if(err){console.log('error in creating user while signing up'); return}

              return res.redirect('/users/sign-in');
          })
      }else{
          return res.redirect('back');
      }

  });
}
// sign in form action
module.exports.createSession = (req,res)=>{
  return res.redirect('/');
}


module.exports.destroySession = function(req,res){
  req.logout();
  return res.redirect('/');
}