import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client"
import { useAuth } from "../context/context";

export default function AdminList() {
  const [users, setUsers] = useState('')
  const [notif, setNotif] = useState('')
  const [chat, setChat] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const router = useNavigate()
  const [some, setSome] = useState('')
  const { user } = useAuth()
  var socket = io('http://localhost:9000')
  //socket.emit('joinroom', user)
  //socket.on('newuseradded', (data) => {
  //setNotif(data)
  //})

  socket.emit('my-room', user)
  socket.on('roomcheck', (data) => {
    setRoom(data)
  })
  socket.on('inbox', (data) => {
    console.log(data)
    setChat(data)
  })
  useEffect(() => {
    if (!user) {
      router('/login')
    }
    getUsers()
  }, [])
  const handleMessage = (e) => {
    setMessage(e.target.value)
  }
  const getUsers = async (e) => {
    try {
      const url = 'http://localhost:3000/user/getusers';
      const result = await axios.get(url)

      setUsers(result.data)
    }
    catch (err) {
      console.log(err)
      //showAlert("Something went wrong, please try again letter")
    }
  };
  useEffect(() => {
    getUsers();
  }, [])
  // useEffect(() => {
  //   socket = io('http://localhost:9000')
  //   socket.on('checkconnection', (notification) => {
  //     if (notification != null) {
  //       setConnectionMessage(notification)
  //     }
  //   });
  //   //socket.emit('check', '-----check---')
  // }, []);

  // useEffect(() => {
  //   notif_socket = io('http://localhost:9000/notification')
  //   //if(callNotif!=null){
  //     notif_socket.emit('useradded', callNotif)
  //     //setCallNotif('')
  //   //}
  //   //setTimeout(()=>{
  //     notif_socket.on('roomcheck', (data)=>{
  //       setNotif(data)

  //     })
  //   //},[10000])
  // }, [callNotif])

  const handleBackend = (e) => {
    e.preventDefault()
    socket.emit('some', some)
  }

  return (
    <>
      <div>
        <div>
        </div>
        <span>{user && <h3>{user}</h3>}</span>
        <span>{room && <h3>{room}</h3>}</span>
        <span>{notif && <h3>{notif}</h3>}</span>
        <span>{chat && <h3>chat: {chat}</h3>}</span>
        <hr />
        <div>
          <div>
            <h4>User List</h4>
          </div>

          {users && users.users && users.users.length > 0 ? (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {users.users.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>
                        <a href={`/message/` + item._id}>Message</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No users created yet</div>
          )}
          <form>
            <input name="password" type="text" placeholder="Enter Password" value={message} required onChange={handleMessage} />
            <br />
            <button onClick={handleBackend} >Button</button>
          </form>

        </div>
      </div>
    </>
  )
}