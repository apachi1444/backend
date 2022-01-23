const multer = require("multer");

const MIME_TYPES = {
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Images");
  },
  // pour génerer un nom unique pour notre image
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});
// pour expliquer que ce ficheier s'agit d'un fichier unique qui contient des images
module.exports = multer({ storage }).single("image");
