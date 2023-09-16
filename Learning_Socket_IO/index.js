const express = require('express')
const { addUser } = require('./service/userService')
require('dotenv').config();
const app = express()


// Enable CORS
const cors = require('cors');
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port_number = 3000;
app.listen(port_number, () => console.log(`Server is running on port: ${port_number}`));

// Connection to Database
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
connectDB()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  pingTimeout: 10000, cors: {
    origin: "*"
  }
})

// var cus_notif = io.of('/notification')
// cus_notif.on('connection', (socket) => {
//   socket.setMaxListeners(20);
  
//   socket.join('room'+room)
//   socket.in('room'+room).emit('roomcheck', 'You are in room: '+room)
  
//   cnt++
//   if(cnt>=2){
//     room++;
//     cnt=0;
//   }
//   console.log('custom notification is on--');
//   socket.on('useradded', (data) => {
//     console.log(data)
//     socket.broadcast.emit('newuseradded', data)
//   })
// })

// var init
// var message
// var room
// io.on('connection', (socket) => {
//   io.setMaxListeners(20);
//   //console.log(`ID: ${socket.id} just connected`);
//   //io.sockets.emit('checkconnection', '--------------user connected--------------')
//   socket.on('message', (data)=>{
//     message=data.message,
//     room = data.room
//   })
//   if(room!=null && message!=null){
//     console.log(room, message)
//     socket.in('room'+room).emit('receivedmessage', message)
//     room=null;
//     message=null;
//   }
//   socket.on('joinroom', (data)=>{
//     //console.log(data)
//     init=data
//   })
//   if(init!=null){
//     socket.join('room'+init)
//     console.log(init)
//     socket.in('room'+init).emit('newuseradded', 'new user added in room'+init)
//     init=null
//   }
//   // socket.join('room'+room)
//   // socket.in('room'+room).emit('roomcheck', 'You are in room: '+room)
//   // console.log(room)
//   // socket.in('user'+socket.id).emit('welcome', 'welcome'+socket.id)

//   socket.on('some', (data)=>{
//     console.log(data)
//     socket.broadcast.emit('something', data)
//   })

//   socket.on('disconnect', () => {
//     //console.log(`ID: ${socket.id} disconnected`);
//   });
// });

//socket v2.0
// var message
// io.on('connection', (socket) => {
//   io.setMaxListeners(20);
//   //console.log(`ID: ${socket.id} just connected`);
//   //io.sockets.emit('checkconnection', '--------------user connected--------------')
//   socket.on('message', (data)=>{
//     message=data
//   })
  
//   if(message!=null){
//     console.log(message)
//     //io.sockets.emit('receivedmessage', message)
//     socket.broadcast.emit('receivedmessage', message)
//     message=null;
//   }
//   socket.on('disconnect', () => {
//     //console.log(`ID: ${socket.id} disconnected`);
//   });
// });

//socket v3.0
io.on('connection', (socket) => {
  socket.on('join-room', (data)=>{
    console.log(data)
    socket.join('room'+data)
    socket.to('room'+data).emit('join-check', 'You are in room: '+data)
  })
  socket.on('my-room', (data)=>{
    console.log(data)
    socket.join('room'+data)
    socket.to('room'+data).emit('roomcheck', 'My room: '+data)
  })
  socket.on('send-message', (data)=>{
    console.log(data)
    socket.to('room'+data.receiver).emit('inbox', data.message)
  })
  socket.on('disconnect', () => {
    //console.log(`ID: ${socket.id} disconnected`);
  });
});

const server_port = 9000
server.listen(server_port, () => console.log(`Socket IO is running on port: ${server_port}`));

app.get('/', (req, res) => {
  res.send('API is Running')
})

// Taking API calls
const user_routes = require('./routes/userRoutes');
app.use('/user', user_routes);
const auth_routes = require('./routes/authRoutes');
app.use('/auth', auth_routes);