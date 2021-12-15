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
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user == req.user.id){
            // store the id of the post before deleting so that post's comment array update can be done
            let postId = comment.post;
            comment.remove();

            //to find and delete the comment from comment array 
            Post.findByIdAndUpdate(postId, { $pull: {comments : req.params.id} },function(err,post){
                return res.redirect('back');
            } )

        }
        else{
            return res.redirect('back');
        }
    })
}