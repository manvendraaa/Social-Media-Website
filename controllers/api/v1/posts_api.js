const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res) {

    let posts = await Post.find({})
    .populate('user')
    .populate({
    path: 'comments',
    populate: {
    path: 'user'
    }});


    res.json(200,{
        message: "List of posts",
        posts : posts
    })
};

module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        //.id means converting the Object ID into string
        // if(post.user == req.user.id){
        if(err){
            return res.json(500, {
                message: "internal server error"
            })
        }

        post.remove();

        Comment.deleteMany({post: req.params.id}, (err)=>{
            res.json(200, {
                message: "post and comments deleted"
            })
        })
    })
}