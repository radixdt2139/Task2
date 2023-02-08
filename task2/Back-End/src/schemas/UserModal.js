const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  verified_email: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  given_name: {
    type: String,
    required: true,

  },
  family_name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
