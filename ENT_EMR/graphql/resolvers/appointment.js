const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');


const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const util = require('util');

const { transformAppointment } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  appointments: async (args, req) => {
    // console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const appointments = await Appointment.find()
      .populate('patient');

      return appointments.map(appointment => {
        return transformAppointment(appointment);
      });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentId: async (args, req) => {
    console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const appointment = await Appointment.findById(args.appointmentId)
      .populate('patient');

        return {
            ...appointment._doc,
            _id: appointment.id,
            title: appointment.title
        };
    } catch (err) {
      throw err;
    }
  },
  getAppointmentField: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const resolverField = args.field;
      const resolverQuery = args.query;

      const appointment = await Appointment.find({resolverField: resolverQuery})
      .populate('patient');

        return {
          ...appointment._doc,
          _id: appointment.id,
          title: appointment.title
        };
    } catch (err) {
      throw err;
    }
  },
  updateAppointment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{
        name: args.appointmentInput.name,
      },{new: true})
      .populate('patient');

        return {
          ...appointment._doc,
          _id: appointment.id,
          title: appointment.title
        };
    } catch (err) {
      throw err;
    }
  },
  updateAppointmentField: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};

      console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

        const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},query,{new: true})
        .populate('patient');

        return {
          ...appointment._doc,
          _id: appointment.id,
          title: appointment.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteAppointment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const appointment = await Appointment.findByIdAndRemove(args.userId)
      .populate('patient');

        return {
          ...appointment._doc,
          _id: appointment.id,
          title: appointment.title
        };
    } catch (err) {
      throw err;
    }
  },
  createAppointment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("createAppointment...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const appointmentPatient = await Patient.findById({_id: args.patientId}).populate('appointments');

      const appointment = new Appointment({
        ...appointment._doc,
        _id: appointment.id,
        title: appointment.title,
        type: appointment.ype,
        date: appointment.date,
        location: appointment.location,
        description: appointment.description,
        patient: appointmentPatient,
        inProgress: appointment.inProgress,
        notes: appointment.notes
      });

      const result = await appointment.save();

      return {
        ...result._doc,
        _id: result.id,
        title: result.title,
        type: result.type,
        date: result.date,
        location: result.location,
        description: result.description,
        patient: result.patient,
        inProgress: result.inProgress,
        notes: result.notes
      };
    } catch (err) {
      throw err;
    }
  },
};
