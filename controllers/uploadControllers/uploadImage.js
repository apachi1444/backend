const fs = require("fs");
// const { User } = require("../../Models/User.js");
const { promisify } = require("util");
const { response } = require("../../utils/response");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadImage = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpeg" &&
      req.file.detectedMimeType != "image/png"
    ) {
      response(
        res,
        true,
        "The format of this file is not valid, it has to be one of these: jpeg or png",
        [],
        400
      );
    }

    if (req.file.size > 5000000)
      response(res, true, "You can't upload a file larger than 5MB", [], 400);
  } catch (error) {
    return response(res, true, "", error, 400);
  }

  const filename = req.body.name + ".jpg";

  const aa = await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${filename}`
    )
  );
};
