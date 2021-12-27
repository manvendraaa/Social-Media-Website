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

module.exports.destroy = async (req,res)=>{

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: "post and comments deleted"
            });
                
        }
        else{
            return res.json (400, {
                message: "you cannot delete this post"
            })
        }
        

    }catch(err){
        return res.json(500, {
            message: "internal server error"
        })
    }
}