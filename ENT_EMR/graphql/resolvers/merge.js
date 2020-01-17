const DataLoader = require('dataloader');
const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const { dateToString } = require('../../helpers/date');

const userLoader = new DataLoader(userIds => {
  return users(userIds);
});
const patientLoader = new DataLoader(patientIds => {
  return patients(patientIds);
});
const appointmentLoader = new DataLoader(appointmentIds => {
  return appointments(appointmentIds);
});


const users = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    users.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    });
    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};
const patients = async patientIds => {
  try {
    const patients = await Patient.find({ _id: { $in: patientIds } });
    patients.sort((a, b) => {
      return (
        patientIds.indexOf(a._id.toString()) - patientIds.indexOf(b._id.toString())
      );
    });
    return patients.map(patient => {
      return transformPatient(patient);
    });
  } catch (err) {
    throw err;
  }
};
const appointments = async appointmentIds => {
  try {
    const appointments = await Appointment.find({ _id: { $in: appointmentIds } });
    appointments.sort((a, b) => {
      return (
        appointmentIds.indexOf(a._id.toString()) - appointmentIds.indexOf(b._id.toString())
      );
    });
    return appointments.map(appointment => {
      return transformAppointment(appointment);
    });
  } catch (err) {
    throw err;
  }
};


const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return user;
  } catch (err) {
    throw err;
  }
};
const singlePatient = async patientId => {
  try {
    const patient = await patientLoader.load(patientId.toString());
    return patient;
  } catch (err) {
    throw err;
  }
};
const singleAppointment = async appointmentId => {
  try {
    const appointment = await appointmentLoader.load(appointmentId.toString());
    return appointment;
  } catch (err) {
    throw err;
  }
};


const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    name: user.name,
    email: user.email,
  };
};
const transformPatient = patient => {
  return {
    ...patient._doc,
    _id: patient.id,
  };
};
const transformAppointment = appointment => {
  return {
    ...appointment._doc,
    _id: appointment.id,
  };
};


exports.transformUser = transformUser;
exports.transformPatient = transformPatient;
exports.transformAppointment = transformAppointment;
