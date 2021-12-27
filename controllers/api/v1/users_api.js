const jwt = require('jsonwebtoken');
const User = require('../../../models/user');


module.exports.createSession = async (req,res)=>{

    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "invalid username or password"
            });
        }
        else{
            return res.json(200,{
                message: 'Sign-in success',
                data: {
                    token : jwt.sign(user.toJSON(), 'secret',{expiresIn: '10000000'})
                }
            })
        }
    }catch(err){
        console.log("******",err);
        return res.json(500, {
            message: "Internal server error"
        })
    }



}
  
  