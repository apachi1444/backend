const delete_t=require("./delete/delete");
const get_t=require("./get/get");
const patch_t=require("./patch/patch");
const post_t=require("./post/post");

const requests=(app)=>{
    get_t(app);
    post_t(app);
    patch_t(app);
    delete_t(app);
};


module.exports=requests;