const response = require("../../utils/response");
const Settings = require("../../Models/Settings");

// req={uid, {key1: value1, key2: value2, ..., keyn: valuen}}; keyi is in
// activeStatus, location, emailVisibility, phoneVisibility, friendsListVisibility,
// starsVisibility, postsVisibility, cookies
// To change the settings take a look at the Settings model

const values = [
  "uid",
  "activeStatus",
  "location",
  "emailVisibility",
  "phoneVisibility",
  "friendsListVisibility",
  "starsVisibility",
  "postsVisibility",
  "cookies",
];

module.exports = async (req, res) => {
  req.body.uid = req?.payload?._id;
  if (!Object.keys(req.body).every((i) => values.includes(i)))
    return response(
      res,
      true,
      "Invalid specified settings, please check out your settings",
      [],
      400
    );

  let updates = {};
  Object.keys(req.body).map((k) =>
    k !== "uid" ? (updates[k] = k) : (updates["ownerId"] = k)
  );
  Settings.findOneAndUpdate({ ownerId: req.body.uid, updates })
    .then((setts) => {
      console.log(setts);
      return response(
        res,
        false,
        "Settings has been updated successfully",
        setts,
        200
      );
    })
    .catch((error) => {
      console.log(error.errors);
      return response(
        res,
        true,
        "Settings could not be updated, try again later",
        error.errors,
        400
      );
    });
};
