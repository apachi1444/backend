const multer = require("multer");
const MIME_TYPES = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname+"/Images");
  },
  /*****Generate a unique name for our image file*****/
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// pour expliquer que ce ficheier s'agit d'un fichier unique qui contient des images
module.exports = multer({ 
  storage:storage,
  limits:{fileSize:5000000}
 }).single("image");
