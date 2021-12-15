const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = (req,res)=>{
    Post.create({
        content : req.body.content,
        user: req.user._id
    },(err,post)=>{
        if(err){console.log('err in post creation');return;}
        return res.redirect('back');
    })
}


module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        //.id means converting the Object ID into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, (err)=>{
                res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}