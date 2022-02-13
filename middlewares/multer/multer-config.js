const multer = require("multer");

const imageTypes = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/Images");
  },

  //Generating a unique name for our image file
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = imageTypes[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ 
  storage:storage,
  limits:{fileSize:5000000}
 }).single("image");
