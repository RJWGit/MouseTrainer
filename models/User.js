const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { number } = require("joi");

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

  highscore: {
    type: Number,
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
  this.save();
};

UserSchema.methods.updateHighScore = async function (score) {
  if (this.highscore < score) {
    this.highscore = score;
    this.save();
  }
};

UserSchema.methods.updateUsername = async function (newname) {
  this.username = newname;
  this.save();
};

UserSchema.methods.updatePassword = async function (newpassword) {
  this.password = await bcrypt.hash(newpassword, 10);
  this.save();
};

module.exports = mongoose.model("User", UserSchema);
