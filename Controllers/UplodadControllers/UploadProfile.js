const fs = require("fs");
const { User } = require("../../Models/User");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
module.exports.updateProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpeg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    ) {
      throw new Error("Invalid File");
    }

    if (req.file.size > 5000000) throw new Error("max size");
  } catch (error) {
    return res.status(400).json({ err });
  }

  const filename = req.body.name + ".jpg";

  const aa = await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${filename}`
    )
  );
};
