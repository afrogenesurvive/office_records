const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  location: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  patient: {
    type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
  },
  inProgress: {
    type: Boolean
  },
  attended: {
    type: Boolean
  },
  important: {
    type: Boolean
  },
  notes: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
