exports.SignUpErrors = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.message.includes("name"))
    errors.name = "Name Incorrect ou déja pris ";
  if (err.message.includes("email")) errors.email = "Email Incorrect ";
  if (err.message.includes("password"))
    errors.password = "Password Incorrect ou déja pris ";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name")) {
    errors.name = "Ce Nom set déja enregistré";
  }
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
    errors.email = "Cet eail set déja enregistré";
  }
  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email Incorrect ";
  if (err.message.includes("password"))
    errors.password = "Password Incorrect ou déja pris ";

  return errors;
};
