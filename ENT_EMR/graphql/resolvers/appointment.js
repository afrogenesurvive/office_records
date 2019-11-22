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
      const appointments = await Appointment.findById(args.appointmentId)
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
      const query = {[resolverField]:resolverQuery};

      console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

      const appointments = await Appointment.find(query)
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  updateAppointment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updateAppointment...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const user = await User.findById(args.userId);
      userRole = user.role;
      console.log("userRole:  ", userRole);

      if (userRole !== "test") {
        throw new Error('Your role does not give access to the data');
      }

      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{
        title:args.appointmentInput.title,
        type: args.appointmentInput.type,
        date: args.appointmentInput.date,
        location: args.appointmentInput.location,
        description: args.appointmentInput.description,
        inProgress: args.appointmentInput.inProgress,
        attended: args.appointmentInput.attended,
        important: args.appointmentInput.important,
        notes: args.appointmentInput.notes
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
  updateAppointmentPatient: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updateAppointmentPatient...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const user = await User.findById(args.userId);
      userRole = user.role;
      console.log("userRole:  ", userRole);

      if (userRole !== "test") {
        throw new Error('Your role does not give access to the data');
      }

      const appointmentPatient = await Patient.findById({_id: args.patientId}).populate('appointments');
      console.log("appointmentPatient:  ", JSON.stringify(appointmentPatient));

      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{patient: appointmentPatient},{new: true})
      .populate('patient');

      const patientAppointment = await Patient. findOneAndUpdate({_id: args.patientId},{$addToSet: {appointments: appointment}},{new: true})
      console.log("patientAppointment:  ", JSON.stringify(patientAppointment));

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
    console.log("updateAppointmentField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const user = await User.findById(args.userId);
      userRole = user.role;
      console.log("userRole:  ", userRole);

      if (userRole !== "test") {
        throw new Error('Your role does not give access to the data');
      }

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
  updateAppointmentFieldArray: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updateAppointmentFieldArray...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const user = await User.findById(args.userId);
      userRole = user.role;
      console.log("userRole:  ", userRole);

      if (userRole !== "test") {
        throw new Error('Your role does not give access to the data');
      }

        const resolverField = args.field;
        const resolverQuery = args.query;
        const query = {[resolverField]:resolverQuery};

        console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

        const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{$addToSet: query},{new: true})
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

      const user = await User.findById(args.userId);
      userRole = user.role;
      console.log("userRole:  ", userRole);

      if (userRole !== "test") {
        throw new Error('Your role does not give access to the data');
      }

      const appointment = await Appointment.findByIdAndRemove(args.appointmentId)
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
      console.log("appointmentPatient:  ", JSON.stringify(appointmentPatient));

      const existingAppointmentTitle = await Appointment.findOne({ title: args.appointmentInput.title});
          if (existingAppointmentTitle) {
            throw new Error('Appointment w/ that title exists already.');
          }


      let appointment = new Appointment({
        _id: args.appointmentInput.id,
        title:args.appointmentInput.title,
        type: args.appointmentInput.type,
        date: args.appointmentInput.date,
        location: args.appointmentInput.location,
        description: args.appointmentInput.description,
        patient: appointmentPatient,
        inProgress: args.appointmentInput.inProgress,
        attended: args.appointmentInput.attended,
        important: args.appointmentInput.important,
        notes: args.appointmentInput.notes
      });

      const result = await appointment.save();

      const patientAppointment = await Patient. findOneAndUpdate({_id: args.patientId},{$addToSet: {appointments: appointment}},{new: true})
      console.log("patientAppointment:  ", JSON.stringify(patientAppointment));

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
        attended: result.attended,
        important: result.important,
        notes: result.notes
      };
    } catch (err) {
      throw err;
    }
  }
};
