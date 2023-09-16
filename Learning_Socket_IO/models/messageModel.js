const mongoose = require('mongoose')
const userModel = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true
    },
    
    chat:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Chat'
    },
    sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
  },{
    timestamps: true
  }
);
const Message = mongoose.model('Message', userModel)
module.exports = Message;