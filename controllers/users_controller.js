module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "profile",
  });
};

module.exports.signIn = (req,res) => {
  return res.render('user_sign_in');
}

module.exports.signUp = (req,res) => {
  return res.render('user_sign_up');
}

// sign up form action
module.exports.create = (req,res)=>{
  // todo later
}
// sign in form action
module.exports.createSession = (req,res)=>{
  // todo later
}