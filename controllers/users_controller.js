const User = require('../models/user');

module.exports.profile = (req, res) => {
  User.findById(req.params.id,(err,user)=>{
    return res.render("user_profile", {
      title: "profile",
      profile_user: user
    });
  })
  
};

module.exports.update = async (req,res)=>{
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
  //     console.log('update run');
  //     return res.redirect('back');
  //   });
  // }else{
  //     return res.status(401).send('Unauthorized');
  //   }

  //converting to async await
  if(req.user.id == req.params.id){
    
    try{
      // find user
      let user = await User.findById(req.params.id);
      // since the form is of type multipart we cannot simply read form data so multer is again used
      User.uploadedAvatar(req,res,function(err) {
        if(err)console.log('error in uploaded Avatar'+err);
        // this function was made static so that available to use everywhere
        // the req and res in multer are used 
        user.name = req.body.name;
        user.email = req.body.email;
        // first check if file uploaded
        console.log(req.file);
        if(req.file){
          //from static
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back')
        
      })

    }catch(err){
      return res.redirect('back');
    }



  }else{
      return res.status(401).send('Unauthorized');
    }

}



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
  req.flash('success', 'Logged in!!');
  return res.redirect('/');
}


module.exports.destroySession = function(req,res){
  req.logout();
  req.flash('success', 'Logged out!!');

  return res.redirect('/');
}

