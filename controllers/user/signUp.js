const User=require("../../Models/User.js");
const { response } = require('../../utils/response.js');
const jwt=require("jsonwebtoken");
const { digest, isInDatabase } =require('../../logic/hash/hash.js');
const { SignUpSchema } =require("../../logic/joi/sign.js");


const signUp=async(req, res)=>{
    if(req.body.password!==req.body.confirm){
        return response(res, true, 'Please make sure the passwords do match!', [], 400);
    };

    const result=SignUpSchema.validate(req.body);
    if(result.error){
        return response(res, true, result.error.details[0].message, [], 400);
    };
    
    let hashed;
    try{
        hashed=await digest(req.body.password);
    }catch(e){
        return response(res, true, "Networking error, please try again", [], 400);
    };

    try {
        const inDatabase= await isInDatabase(req.body);
        if(inDatabase!==null){
            return response(res, true, inDatabase, {}, 400);

        }
    } catch (error) {
        return response(res, true, "This email might have been used before, please use another one", [], 400);
    };

    const userInstance=new User({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        occupation: req.body.occupation,
        password: hashed
    });
    
    try{
        const savedUser= await userInstance.save();
        const token=jwt.sign({email: savedUser.email, _id: savedUser._id}, process.env.JWT_KEY, {expiresIn: "1h"});
        res.token=token;
        return response(res, true, savedUser, [], 400);
    }catch(err){
        return response(res, true, "Connection error, please try later", [], 400);
    }    
}

module.exports=signUp;