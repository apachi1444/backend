module.exports = function (
  res,
  error = false,
  message = "",
  data = [],
  stat = 200
) {
  res?.status(stat)?.json({ error, message, data });
};
