const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dob:{
    type: Date
  },
  address: {
    type: String,
    required: true
  },
  registrationDate:{
    type: Date
  },
  referringDoctor: {
    name: String,
    email: String,
    phone: String
  },
  contact: {
    phone: String,
    email: String
  },
  occupation: {
      role: String,
      employer: String,
      contact: {
        phone: String,
        email: String
      }
  },
  insurance: {
    company: String,
    number: String,
    description: String,
    expiry: {
      type: Date
    },
    subscriber: {
      company: String,
      description: String
    }
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
          ref: 'Appointment'
    }
  ],
  nextOfKin: [{
    name: String,
    contact: {
      phone: String,
      email: String
    }
  }],
  complaint: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String
    }
  ],
  history: [
    {
      type: String,
      date: {
        type: Date
      },
      title: String,
      description: String
    }
  ],
  allergies: [
    {
      title: String,
      description: String
    }
  ],
  medication: [
    {
      title: String,
      description: String
    }
  ],
  investigation: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String
    }
  ],
  diagnosis: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String
    }
  ],
  treatment: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String,
      dose: String,
      frequency: String,
      type: String
    }
  ],
  notes: [String],
  tags: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
