import { io } from "socket.io-client";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
var socket = io('http://localhost:9000')

export default function Message() {
  const [message, setMessage] = useState('')
  const [notif, setNotif] = useState('')
  const [chat, setChat] = useState('')
  const [roomCheck, setRoomCheck] = useState('')
  const { id } = useParams()
  socket.emit('join-room', id)
  socket.on('join-check', (data) => {
    setRoomCheck(data)
  })
  const navigate = useNavigate()

  const handleMessage = (e)=>{
    setMessage(e.target.value)
  }
  const handleGoBack = (e) =>{
    navigate('/dashboard')
  }
  const handleBackend = (e) =>{
    //e.preventDefault()
    const data ={
      receiver:id,
      message:message
    }
    console.log(data)
    socket.emit('send-message', data)
  }
  return (<>
    <div>
      <h1>{id}</h1>
      {chat && <h1>{chat}</h1>}
      {roomCheck && <h1>{roomCheck}</h1>}
      <button onClick={handleGoBack}>Back</button>
      <form onSubmit={handleBackend}>
        <div>
          <input name="text" type="text" placeholder="Enter Something" value={message} required onChange={handleMessage} />
        </div>
        <br />
        <input type="submit"/>
      </form>
    </div>
  </>)
}