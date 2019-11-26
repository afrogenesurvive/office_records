const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: String,
  employmentDate: {
    type: Date
  },
  terminationDate: {
    type: Date
  },
  attachments: [
    {
      name: String,
      format: String,
      path: String
    }
  ],
  attendance: [
    {
      date: {
        type: Date
      },
      status: String,
      description: String
    }
  ],
  leave: [
    {
      type: String,
      startDate: {
        type: Date
      },
      endDate: {
        type: Date
      }
    }
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
