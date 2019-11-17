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
  notes: [String]
},
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
