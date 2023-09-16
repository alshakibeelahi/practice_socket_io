import axios from "axios"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
export default function AdminList() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState('')
  const [callNotif, setCallNotif] = useState('')
  const [notif, setNotif] = useState('')
  const [connectionMessage, setConnectionMessage] = useState('')

  const [some, setSome] = useState('')
  //var  notif_socket
  //var socket = io('http://localhost:9000')
  const handleChangeName = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
  }
  const handleChangePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  }
  const handleChangeEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name || !password || !email) {
    }
    else {
      const result = await addUser(name, password, email)
      if (result != null) {
        //showAlert(`User added successfully`)
        setCallNotif(result.name+' added successfull')
        console.log(result.name)
        getUsers()
      }
      else {
        //showAlert(`User Couldnot added`)
      }
    }
  }
  async function addUser(name, password, email) {
    try {
      const url = 'http://localhost:3000/auth/signup'
      const userData = {
        name: name,
        email: email,
        password: password,
      }
      const result = await axios.post(url, userData);
      return result.data
    }
    catch (err) {
      console.log(err)
      //showAlert('Something went wrong, try again')
    }
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

  // const handleBackend = (e) =>{
  //   e.preventDefault()
  //   socket.emit('some', some)
  // }
  // socket.on('something', (data)=>[
  //   setConnectionMessage(data)
  // ])
  // socket.on('welcome', (data)=>{
  //   setNotif(data)
  // })
  return (
    <>
      <div>
        <div>
          <div>
            <a href="./login">Login</a>
          </div>
          <h3>Add User</h3>
          <form onSubmit={handleAdd}>
            <input name="name" type="text" placeholder="Enter Name" required onChange={handleChangeName} />
            <br />
            <input name="email" type="text" placeholder="Enter Email" required onChange={handleChangeEmail} />
            <br />
            <input name="password" type="password" placeholder="Enter Password" required onChange={handleChangePassword} />
            <br />
            <input type="submit" />
          </form>
        </div>
        <span>{notif && <h1>{notif}</h1>}</span>

        <span>{connectionMessage && <h1>{connectionMessage}</h1>}</span>
        <hr className="h-px bg-gray-200 border-1 dark:bg-gray-700" />
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
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {users.users.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No users created yet</div>
          )}
          {/* <form >
            <input name="password" type="text" placeholder="Enter Password" value={some} required onChange={(e)=>setSome(e.target.value)} />
            <br />
            <button onClick={handleBackend} >Button</button>
          </form> */}

        </div>
      </div>
    </>
  )
}