const { searchUser } = require('../service/authService')

const login = async (req, res) => {
  
  try {
    const user = await searchUser(req.body)
    if(user!=null){
      console.log(user)
      res.status(200).json(user)
    }
  } catch (error) {
    console.log(error)
  }
}

const checkSignUpCode = async (req, res) => {
  try {
    const user = await searchUser(req.body)
    if(user!=null){
      res.status(200).json(user)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { login }