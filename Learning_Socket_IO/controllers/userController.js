const { addUser, getAll, getById, deleteById, updateById } = require('../service/userService')
const sendMail = require('../common/nodemailer')
const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body)
    // if(user){
    //   sendMail(user)
    // }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}
const getUser = async (req, res) => {
  try {
    const users = await getAll()
    res.status(200).json({ users })
    // console.log(req.body)
  } catch (error) {
    console.log(error)
  }
}

const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await getById(id)
    res.status(200).json({ user })
  } catch (err) {

  }
}
const validateSignUpCode = async (req, res) => {
  try {
    const id = req.params.id
    const user = await getById(id)
    const checkingTime = new Date();
    checkingTime.setMinutes(checkingTime.getMinutes() - 3);

    if (new Date(user.updatedAt) < checkingTime) {
      return res.status(400).json({ error: 'Checking time has expired' });
    }
    else{
      if(user.code===req.body.code){
        return res.status(200).json({ error: 'User 2-step verification done' });
      }
      return res.status(401).json({message:"2-step validation failed"})
    }
  } catch (err) {

  }
}
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getById(id);
    //console.log(id, user)
    if (user != null) {
      const newUser = {
        name: req.body.name
      };
      const options = { new: true };
      //console.log(newUser)
      const updatedUser = await updateById(id, newUser, options);
      res.status(200).json({ user: updatedUser });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await deleteById(id)
    res.status(200).json({ user })
  } catch (err) {

  }
}

module.exports = { createUser, getUser, updateUser, getUserById, deleteUser, validateSignUpCode }