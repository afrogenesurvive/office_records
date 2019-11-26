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
  referralDate:{
    type: Date
  },
  expirationDate:{
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
  appointments: [
    {
      type: Schema.Types.ObjectId,
          ref: 'Appointment'
    }
  ],
  insurance: [
    {
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
  }
],
  nextOfKin: [
    {
    name: String,
    contact: {
      phone: String,
      email: String
    }
  }
],
  complaints: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
    }
  ],
  examination: [
    {
    area: String,
    type: String,
    measure: String,
    value: String,
    description: String,
    attachments: [
      {
        name: String,
        format: String,
        path: String
    }
  ]
  }
],
  history: [
    {
      type: String,
      date: {
        type: Date
      },
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
      }
  ]
    }
  ],
  allergies: [
    {
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
    }
  ],
  medication: [
    {
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
    }
  ],
  investigation: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
    }
  ],
  diagnosis: [
    {
      date: {
        type: Date
      },
      title: String,
      description: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
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
      type: String,
      attachments: [
        {
          name: String,
          format: String,
          path: String
        }
      ]
    }
  ],
  billing:[
    {
    date: {
      type: Date
    },
    title: String,
    type: String,
    description: String,
    amount: Number,
    paid: {
      type: Boolean
    },
    attachments: [
      {
        name: String,
        format: String,
        path: String
      }
    ],
    notes: String
  }
],
  notes: [String],
  tags: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
