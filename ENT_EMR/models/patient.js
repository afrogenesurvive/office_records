const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  title: {type: String},
  name: {type: String,required: true},
  dob:{type: Date},
  age: {type: Number},
  gender: {type: String},
  address: {
    number: {type:Number},
    street: {type:String},
    town: {type:String},
    parish: {type:String},
    postOffice: {type:String},
  },
  registrationDate:{type: Date},
  referralDate:{type: Date},
  expirationDate:{type: Date},
  attendingPhysician: {
    name: {type:String},
    email: {type:String},
    phone: {type:String},
  },
  referringDoctor: {
    name: {type:String},
    email: {type:String},
    phone: {type:String}
  },
  contact: {
    phone: {type:String},
    email: {type:String}
  },
  occupation: {
      role: {type:String},
      employer: {type:String},
      contact: {
        phone: {type:String},
        email: {type:String}
      }
  },
  appointments: [{
      type: Schema.Types.ObjectId,
          ref: 'Appointment',
          _id: false
    }],
  consultant: [{
    date: {type: Date},
    reference:{
    type: Schema.Types.ObjectId,
      ref: 'User'
  },
  _id: false
}],
  insurance: [{
    company: {type:String},
    number: {type:String},
    description: {type:String},
    expiry: {type: Date},
    subscriber: {
      company: {type:String},
      description: {type:String}
    },
    _id: false
  }],
  nextOfKin: [{
    name: {type:String},
    contact: {
      phone: {type:String},
      email: {type:String}
    },
    _id: false
  }],
  complaints: [{
      date: {type: Date},
      title: {type:String},
      description: {type:String},
      anamnesis: {type:String},
      attachment: {
          name: {type:String},
          format: {type:String},
          path: {type:String},
        },
        _id: false
    }],
  surveys: [{
      date: {type: Date},
      title: {type:String},
      description: {type:String},
      attachment: {
          name: {type:String},
          format: {type:String},
          path: {type:String}
        },
        _id: false
    }],
  vitals:[{
      pr: {type: Number},
      bp1: {type: Number},
      bp2: {type: Number},
      rr: {type: Number},
      temp: {type: Number},
      ps02: {type: Number},
      height: {type: Number},
      weight: {type: Number},
      bmi: {type: Number},
      urine:{
        type: {type: String},
        value: {type: String},
      }
    }],
  examination: [{
    date: {type: Date},
    general: {type: String},
    area: {type:String},
    type: {type:String,},
    measure: {type:String},
    value: {type:String},
    description: {type:String},
    followUp: {type:Boolean},
    attachment: {
        name: {type:String},
        format: {type:String},
        path: {type:String}
    },
    _id: false
  }],
  history: [{
      type: {type: String},
      date: {type: Date},
      title: {type:String},
      description: String,
      attachment: {
          name: {type:String},
          format: {type:String},
          path: {type:String},
      }
    }],
  allergies: [{
      type: {type:String},
      title: {type:String},
      description: {type:String},
      attachment: {
          name: {type: String},
          format: {type: String},
          path: {type: String},
        },
        _id: false
    }],
  medication: [{
      title: {type: String},
      type: {type: String},
      description: {type: String},
      attachment: {
          name: {type: String},
          format: {type: String},
          path: {type: String},
        },
        _id: false
    }],
  investigation: [{
      date: {type: Date},
      type: {type: String},
      title: {type: String},
      description: {type: String},
      attachment: {
          name: {type: String},
          format: {type: String},
          path: {type: String},
        },
        _id: false
    }],
  diagnosis: [{
      date: {type: Date},
      type: {type: String},
      title: {type: String},
      description: {type: String},
      attachment: {
          name: {type: String},
          format: {type: String},
          path: {type: String},
        },
        _id: false
    }],
  treatment: [{
      date: {type: Date},
      type: {type: String},
      title: {type: String},
      description: {type: String},
      dose: {type: String},
      frequency: {type: String},
      type: {type: String},
      attachment: {
          name: {type: String},
          format: {type: String},
          path: {type: String},
        },
        _id: false
    }
  ],
  billing:[{
    date: {type: Date},
    title: String,
    type: {type: String},
    description: String,
    amount: Number,
    paid: {type: Boolean},
    attachment:{
        name: {type: String},
        format: {type: String},
        path: {type: String},
      },
    notes: {type: String},
    _id: false
  }],
  attachments: [{name: String,format: String,path: String}],
  notes: [String],
  tags: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
