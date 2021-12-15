const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post, (err,post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                post: post._id,
                user: req.user._id
            },(err,comment)=>{
                // now we add the comment to the posts array.
                post.comments.push(comment);
                // whenever updating data use save to save the changes in DB
                post.save();
                res.redirect('/');
            })
        }
    } )
}

module.exports.destroy = (req,res)=>{
    Comment.findById({req.params.id},(err,comment)=>{
        if(comment.user == req.user.id){
            
        }
    })
}