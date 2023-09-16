import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/context";

export default function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigete = useNavigate()
  const {login} = useAuth()

  const handleChangeName = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  }
  const handleChangePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!name || !password){

    }
    else{
      try {
        const url = 'http://localhost:3000/auth/login';
        const data = {
          email: name,
          password: password
        }
        
        const result = await axios.post(url, data)
  
        if(result.data!=null){
          console.log(result.data)
          login(result.data._id)
          navigete(`/dashboard/`)
          console.log(result.data._id)
        }
      }
      catch (err) {
        console.log(err)
        //showAlert("Something went wrong, please try again letter")
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>        
          Email: <input type="text" value={name} onChange={handleChangeName} />
        </div>
        <div>
          Password: <input type="text" value={password} onChange={handleChangePassword} />
        </div>        
        <input type="submit" />
      </form>
    </>
  )
}