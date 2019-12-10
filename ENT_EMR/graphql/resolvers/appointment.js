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
    console.log(`
      appointments...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const appointments = await Appointment.find()
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
    console.log(`
      getAppointmentId...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
    console.log(`
      getAppointmentField...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};

      console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

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
    console.log(`
      getAppointmentPatient...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findById({_id:args.patientId})
      console.log(`
        patient: ${util.inspect(patient)}
        `);
      const appointments = await Appointment.find({patient: patient})
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
    console.log(`
      getAppointmentDateRange...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      let startDate = new Date(args.startDate);
      let endDate = new Date(args.endDate);
      console.log("startDate:  ", startDate, "endDate:  ", endDate);

      const appointments = await Appointment.find({'date': {'$gt' : startDate, '$lt': endDate}})
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentDate: async (args, req) => {
    console.log(`
      getAppointmentDate...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const appointments = await Appointment.find({'date': {'$eq' : args.date}})
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentToday: async (args, req) => {
    console.log(`
      getAppointmentToday...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      let today = new Date();
      let tomorrow = new Date(Date.now() + 1*24*60*60*1000);
      let yesterday = new Date(Date.now() - 1*24*60*60*1000);
      console.log("Yesterday:  ", today);
      console.log("Tomorrow:  ",tomorrow);
      console.log("Yesterday:  ",yesterday);

      const appointments = await Appointment.find({'date': {'$gt' : today, '$lt': tomorrow}})
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentWeek: async (args, req) => {
    console.log(`
      getAppointmentWeek...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      let today = new Date();
      let weekLater = new Date(Date.now() + 7*24*60*60*1000);
      console.log("Today:  ", today);
      console.log("weekLater:  ",weekLater);

      const appointments = await Appointment.find({'date': {'$gte' : today, '$lt': weekLater}})
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  getAppointmentWeekImportant: async (args, req) => {
    console.log(`
      getAppointmentWeekImportant...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      let today = new Date();
      let weekLater = new Date(Date.now() + 7*24*60*60*1000);
      console.log("Today:  ", today);
      console.log("weekLater:  ",weekLater);

      const appointments = await Appointment.find({'date': {'$gte' : today, '$lt': weekLater},important: true})
      .populate('patient');

        return appointments.map(appointment => {
          return transformAppointment(appointment);
        });
    } catch (err) {
      throw err;
    }
  },
  updateAppointment: async (args, req) => {
    console.log(`
      updateAppointment...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const user = await User.findById(args.userId);
      // userRole = user.role;
      // console.log("userRole:  ", userRole);
      //
      // if (userRole !== "test") {
      //   throw new Error('Your role does not give access to the data');
      // }
      const appointment = await Appointment.findOneAndUpdate({_id:args.appointmentId},{
        title:args.appointmentInput.title,
        type: args.appointmentInput.type,
        date: args.appointmentInput.date,
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
    console.log(`
      updateAppointmentNotes...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointmentNote = args.appointmentInput.notes;
      console.log("appointmentNote:  ", appointmentNote);

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
    console.log(`
      updateAppointmentPatient...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const user = await User.findById(args.userId);
      // userRole = user.role;
      // console.log("userRole:  ", userRole);
      //
      // if (userRole !== "test") {
      //   throw new Error('Your role does not give access to the data');
      // }
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
    console.log(`
      updateAppointmentField...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const user = await User.findById(args.userId);
      // userRole = user.role;
      // console.log("userRole:  ", userRole);
      //
      // if (userRole !== "test") {
      //   throw new Error('Your role does not give access to the data');
      // }

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
    console.log(`
      deleteAppointment...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // const user = await User.findById(args.userId);
      // userRole = user.role;
      // console.log("userRole:  ", userRole);
      //
      // if (userRole !== "test") {
      //   throw new Error('Your role does not give access to the data');
      // }
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
    console.log(`
      createAppointment...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const appointmentPatient = await Patient.findById({_id: args.patientId})
      .populate('appointments');
      console.log(`
        appointmentPatient:
        ${util.inspect(appointmentPatient)}
      `);

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

      const patientAppointment = await Patient. findOneAndUpdate({_id: args.patientId},{$addToSet: {appointments: appointment}},{new: true})
      console.log(`
          patientAppointment:
          ${util.inspect(patientAppointment)}
        `);

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
