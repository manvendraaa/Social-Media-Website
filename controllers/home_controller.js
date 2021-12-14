//collection of all the actions
const Post = require('../models/post');

module.exports.home = (req, res) => {
  // this way you can get the posts but if you want to populate use the second function
  // Post.find({}, (err,posts)=>{
  //   return res.render("home", {
  //     title: "Social Media || Home",
  //     posts: posts
  //   });
  // })
  // populate the user of each post
  Post.find({}).populate('user').exec((err,posts)=>{
    return res.render("home", {
      title: "Home",
      posts: posts
    });
  })

  
};
