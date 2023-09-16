const mongoose = require("mongoose");
const userSchema = require('../models/userModel');
const User = mongoose.model("User", userSchema);

exports.searchUser = async (userInfo) => {
  try {
    const user = await User.findOne({ email: userInfo.email });
    console.log(user)
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
