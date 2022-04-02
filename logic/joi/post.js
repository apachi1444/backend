const Joi=require("joi");

const postSchema=Joi.object({
    city: Joi.string().max(200).required(),
    address: Joi.string().max(200).required(),
    category: Joi.string().valid("apartment", "room").required(),
    roomsNumber: Joi.number().min(1).max(10).required(),
    livingRooms: Joi.number().min(0).max(4).required(),
    floor: Joi.number().min(0).max(10).required(),
    securityPrice: Joi.number().min(0).required(),
    description: Joi.string().min(5).max(400).required(),
    price: Joi.number().min(5).required(),
    moreServices: Joi.array().items(Joi.string())
});


module.exports={ postSchema };