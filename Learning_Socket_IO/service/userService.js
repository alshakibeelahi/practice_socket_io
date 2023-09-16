const mongoose = require("mongoose");
const userSchema = require('../models/userModel');
const User = mongoose.model("User", userSchema);


exports.addUser = async (userInfo) => {
  try {
    const code = Math.floor(Math.random() * 9000) + 1000;
    userInfo.code = code
    const newUser = new User(userInfo);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};
exports.getAll = async (e) => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.error(err);
    return null;
  }
};
exports.getById = async (id) => {
  try {
    const user = await User.findById(id);
    console.log(id, user)
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
exports.updateById = async  (id, document, options) =>{
  try {
    const user = await User.findByIdAndUpdate(id, document, options)
    return user
  } catch (error) {
    console.log(error)
  }
}
exports.deleteById = async (id) =>{
  try {
    const user = await User.findByIdAndDelete(id)
    console.log(user)
    return user
  } catch (error) {
    console.log(error)
  }
}
