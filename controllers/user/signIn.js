const { SignInSchema } = require("../../logic/joi/sign.js");
const User=require("../../Models/User.js");
const { validPassword } = require("../../logic/hash/hash.js");
const jwt=require("jsonwebtoken");

const signIn=async(req, res)=>{
    const valid=SignInSchema.validate(req.body);
    if(valid.error){
        return response(res, true, valid.error.details[0].message, [], 400);
    };

    try {
        const user=await User.findOne({email: req.body.email});
        if(user){
            const isValid=await validPassword(req.body.password, user.password);
            if(!isValid){
                return response(res, true, "Wrong password, please try again", [], 400);
            };
            const token=jwt.sign({_id: user._id, email: user.email}, process.env.JWT_KEY);
            res["authToken"]=token;
            return response(res, true, "", user, 200);
        }
        return response(res, true, "You don't have an account, please register", [], 400);
    } catch (error) {
        return response(res, true, "Connection error, please try later", [], 400);
    }
}

module.exports=signIn;