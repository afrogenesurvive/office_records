const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');
const util = require('util');

const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');

const { transformAppointment } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  appointments: async (args, req) => {
    // console.log(`
    //   appointments...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointments = await Appointment.find({})
      .populate('patient')
      .populate('patient.consultant');

      return appointments.map(appointment => {
        return transformAppointment(appointment);
      });
    } catch (err) {
      throw err;
    }
  },
  appointmentsDateAsc: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointments = await Appointment.find({})
      .sort({ date: 1 })
      .populate('patient')
      .populate('patient.consultant');

      return appointments.map(appointment => {
        return transformAppointment(appointment);
      });
    } catch (err) {
      throw err;
    }
  },
  appointmentsDateDesc: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointments = await Appointment.find({})
      .sort({ date: -1 })
      .populate('patient')
      .populate('patient.consultant');

      return appointments.map(appointment => {
        return transformAppointment(appointment);
      });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentId: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointment = await Appointment.findById(args.appointmentId)
      .populate('patient')
      .populate('patient.consultant');

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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const appointments = await Appointment.find(query)
      .populate('patient')
      .populate('patient.consultant')
      .populate('patient.appointments');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentPatient: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findById({_id:args.patientId});
      const appointments = await Appointment.find({patient: patient})
      .sort({ date: 1 })
      .populate('patient')
      .populate('patient.consultant')
      .populate('patient.appointments');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentDateRange: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const startDate = new Date(args.startDate);
      const endDate = new Date(args.endDate);

      const appointments = await Appointment.find({'date': {'$gt' : startDate, '$lt': endDate}})
      .sort({ date: 1 })
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentDate: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const appointments = await Appointment.find({'date': {'$eq' : args.date}})
      .sort({ time: 1 })
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentToday: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const today = new Date();
      const tomorrow = new Date(Date.now() + 1*24*60*60*1000);
      const yesterday = new Date(Date.now() - 1*24*60*60*1000);
      const appointments = await Appointment.find({'date': {'$gt' : yesterday, '$lt' : tomorrow}})
      .sort({ time: 1 })
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentWeek: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const today = new Date();
      const weekLater = new Date(Date.now() + 7*24*60*60*1000);
      const appointments = await Appointment.find({'date': {'$gte' : today, '$lt': weekLater}})
      .sort({ date: 1 })
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentWeekImportant: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const today = new Date();
      const weekLater = new Date(Date.now() + 7*24*60*60*1000);
      const appointments = await Appointment.find({'date': {'$gte' : today, '$lt': weekLater},important: true})
      .sort({ date: 1 })
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  updateAppointment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},
      {
        title:args.appointmentInput.title,
        type: args.appointmentInput.type,
        date: args.appointmentInput.date,
        time: args.appointmentInput.time,
        seenTime: args.appointmentInput.seenTime,
        checkinTime: args.appointmentInput.checkinTime,
        location: args.appointmentInput.location,
        description: args.appointmentInput.description,
        inProgress: args.appointmentInput.inProgress,
        attended: args.appointmentInput.attended,
        important: args.appointmentInput.important,
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
  updateAppointmentNotes: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointmentNote = args.appointmentInput.notes;
      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{$addToSet: {notes: appointmentNote}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const appointmentPatient = await Patient.findById({_id: args.patientId}).populate('appointments');
      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{patient: appointmentPatient},{new: true})
      .populate('patient');
      const patientAppointment = await Patient. findOneAndUpdate({_id: args.patientId},{$addToSet: {appointments: appointment}},{new: true});

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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointmentPatient = await Patient.findById({_id: args.patientId})
      .populate('appointments');
      const existingAppointmentTitle = await Appointment.findOne({ title: args.appointmentInput.title});
          if (existingAppointmentTitle) {
            throw new Error('Appointment w/ that title exists already.');
          }

      let appointment = new Appointment({
        _id: args.appointmentInput.id,
        title: args.appointmentInput.title,
        type: args.appointmentInput.type,
        date: args.appointmentInput.date,
        time: args.appointmentInput.time,
        seenTime: args.appointmentInput.seenTime,
        checkinTime: args.appointmentInput.checkinTime,
        location: args.appointmentInput.location,
        description: args.appointmentInput.description,
        patient: appointmentPatient,
        inProgress: args.appointmentInput.inProgress,
        attended: args.appointmentInput.attended,
        important: args.appointmentInput.important,
        notes: args.appointmentInput.notes
      });

      const result = await appointment.save();
      const patientAppointment = await Patient. findOneAndUpdate({_id: args.patientId},{$addToSet: {appointments: appointment}},{new: true});

      return {
        ...result._doc,
        _id: result.id,
        title: result.title,
        type: result.type,
        date: result.date,
        time: result.time,
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
