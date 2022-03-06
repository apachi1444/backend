const bcrypt=require("bcrypt");
const User=require("../../Models/User.js");

const digest=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password, salt);
    return hashed;
}

const validPassword=async(pass, hash)=>{
    const isValid=await bcrypt.compare(pass, hash);
    return isValid;
}
const isInDatabase=async({ email, username })=>{
    let response=null;
    try {
        const emExist=await User.findOne({email: email});
        if(emExist) return "This email has been already used, please use another one";
        const nameExist=await User.findOne({username: username});
        if(nameExist) return "This username has been used on Market, please choose another one";
        return response;
    } catch (error) {
        return "Something is wrong, please check out your network connection";
    }
}
module.exports={ digest, isInDatabase, validPassword };