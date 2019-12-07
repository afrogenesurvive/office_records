const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String,required: true},
  password: {type: String,required: true},
  name: {type: String,required: true},
  dob:{type: Date},
  address: {
    number: Number,
    street: {type: String},
    town: {type: String},
    parish: {type:String},
    postOffice: {type:String},
  },
  phone: {type: String},
  role: {type:String},
  employmentDate: {type: Date},
  terminationDate: {type: Date},
  attachments: [{
    name: {type:String},
    format: {type:String},
    path: {type:String},
    _id: false
  }],
  attendance: [{
    date: {type: Date},
    status: {type:String},
    description: {type:String},
    _id: false
    }],
  leave: [{
      type: {type:String},
      title: {type:String},
      startDate: {type: Date},
      endDate: {type: Date},
      _id: false
    }]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
