const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

//Called everytime shema is saved
UserSchema.pre("save", async function (next) {
  //This is to make sure this only happens when user is first created. If it's unhashed then the first chracter cannot contain '$' in the password.
  //Update later for a less hacky method
  if (this.password[0] != "$") {
    this.password = await bcrypt.hash(this.password, 10);
    next(); //move onto next middleware step
  } else {
    next();
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.updateRefreshToken = function (token) {
  this.refreshToken = token;
};

module.exports = mongoose.model("User", UserSchema);
