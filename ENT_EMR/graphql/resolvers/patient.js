const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');


const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const util = require('util');

const { transformPatient } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  patients: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("patients...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patients = await Patient.find()
      .populate('appointments');

      return patients.map(patient => {
        return transformPatient(patient);
      });
    } catch (err) {
      throw err;
    }
  },
  getPatientId: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("getPatientId...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patient = await Patient.findById(args.patientId)
      .populate('appointments');

        return {
            ...patient._doc,
            _id: patient.id,
            name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  getPatientField: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("getPatientField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};

      console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

      // const patients = await Patient.find(query);
      const patients = await Patient.find({'address': resolverQuery});

      return patients.map(patient => {
        return transformPatient(patient);

      });
    } catch (err) {
      throw err;
    }
  },
  updatePatient: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatient...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{
          name: args.patientInput.name,
          dob: args.patientInput.dob,
          address: args.patientInput.address,
          contact: {
            phone: args.patientInput.contactPhone,
            email: args.patientInput.contactEmail
          },
          registrationDate: dateTime,
          referringDoctor: {
            name: args.patientInput.referringDoctorName,
            email: args.patientInput.referringDoctorEmail,
            phone: args.patientInput.referringDoctorPhone
          },
          occupation: {
            role: args.patientInput.occupationRole,
            employer: args.patientInput.occupationEmployer,
            contact:{
              phone: args.patientInput.occupationEmployerContactPhone,
              email: args.patientInput.occupationEmployerContactEmail
            }
          },
        insurance: {
          company: args.patientInput.insuranceCompany,
          number: args.patientInput.insuranceNumber,
          description: args.patientInput.insuranceDescription,
          expiry: args.patientInput.insuranceExpiry,
          subscriber: {
            company: args.patientInput.insuranceSubscriberCompany,
            description: args.patientInput.insuranceSubscriberDescription
          }
        }
      }
      ,{new: true})
      .populate('appointments');

        return {
            ...patient._doc,
            _id: patient.id,
            name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  updatePatientArray: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientArray...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientNextOfKinObject = {
        name: args.patientInput.nextOfKinName,
        phone: args.patientInput.nextOfKinPhone,
        email: args.patientInput.nextOfKinEmail
      }

      const patientComplaintObject = {
        date: args.patientInput.complaintDate,
        title: args.patientInput.complaintTitle,
        description: args.patientInput.complaintDescription
      }

      const patientHistoryObject = {
        title: args.patientInput.historyTitle,
        type: args.patientInput.historyType,
        date: args.patientInput.historyDate,
        description: args.patientInput.historyDescription
      }

      const patientAllergiesObject = {
        title: args.patientInput.allergiesTitle,
        description: args.patientInput.allergiesDescription
      }

      const patientMedicationObject = {
        title: args.patientInput.medicationTitle,
        description: args.patientInput.medicationDescription
      }

      const patientInvestigationObject = {
        date: args.patientInput.investigationDate,
        title: args.patientInput.investigationTitle,
        description: args.patientInput.investigationDescription
      }

      const patientDiagnosisObject = {
        date: args.patientInput.diagnosisDate,
        title: args.patientInput.diagnosisTitle,
        description: args.patientInput.diagnosisDescription
      }

      const patientTreatmentObject = {
        date: args.patientInput.treatmentDate,
        title: args.patientInput.treatmentTitle,
        type: args.patientInput.treatmentType,
        description: args.patientInput.treatmentDescription,
        dose: args.patientInput.treatmentDose,
        frequency: args.patientInput.treatmentFrequency
      }

      const patientBillingObject = {
        date: args.patientInput.billingDate,
        title: args.patientInput.billingTitle,
        type: args.patientInput.billingType,
        description: args.patientInput.billingDescription,
        amount: args.patientInput.billingAmount,
        paid: args.patientInput.billingPaid,
        notes: args.patientInput.billingNotes
      }

      console.log(`
        updatePatientArray input objects:
        nextOfKin: ${patientNextOfKinObject}
        complaint: ${patientComplaintObject}
        history: ${patientHistoryObject}
        allergies: ${patientAllergiesObject}
        medication: ${patientMedicationObject}
        investigation: ${patientInvestigationObject}
        diagnosis: ${patientDiagnosisObject}
        treatment: ${patientTreatmentObject}
        billing: ${patientBillingObject}
        `);


      // const today = new Date();
      // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // const dateTime = date+' '+time;

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},
        {$addToSet:
          {
            nextOfKin: patientNextOfKinObject,
            complaint: patientComplaintObject,
            history: patientHistoryObject,
            allergies: patientAllergiesObject,
            medication: patientMedicationObject,
            investigation: patientInvestigationObject,
            diagnosis: patientDiagnosisObject,
            treatment: patientTreatmentObject,
            billing: patientBillingObject
           }
      }
      ,{new: true})
      .populate('appointments');

        return {
            ...patient._doc,
            _id: patient.id,
            name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  updatePatientField: async (args, req) => {
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

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},query,{new: true})
        .populate('appointments');

        return {
          ...patient._doc,
          _id: patient.id,
          name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  updatePatientFieldArray: async (args, req) => {
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

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: query},{new: true})
        .populate('appointments');

        return {
          ...patient._doc,
          _id: patient.id,
          name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  updatePatientAppointment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientAppointment...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

        const patientAppointment = await Appointment.findById({_id:args.appointmentId});
        const patientAppointmentId = patientAppointment.id
        console.log("patientAppointment... " + patientAppointment.name);
        console.log("patientAppointmentId... " + patientAppointmentId);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {appointments:patientAppointment}},{new: true})

          return {
              ...patient._doc,
              _id: patient.id,
              name: patient.name
          };
      // }
    } catch (err) {
      throw err;
    }
  },
  deletePatient: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("deletePatient...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patient = await Patient.findByIdAndRemove(args.patientId)
      .populate('appointments');

        return {
          ...patient._doc,
          _id: patient.id,
          name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  createPatient: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("createPatient...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const existingPatientName = await Patient.findOne({ name: args.patientInput.name});

      if (existingPatientName) {
        throw new Error('Patient w/ that name exists already.');
      }

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      const patient = new Patient(
        {
        name: args.patientInput.name,
        dob: args.patientInput.dob,
        address: args.patientInput.address,
        contact: {
          phone: args.patientInput.contactPhone,
          email: args.patientInput.contactEmail
        },
        registrationDate: dateTime,
        referringDoctor: {
          name: args.patientInput.referringDoctorName,
          email: args.patientInput.referringDoctorEmail,
          phone: args.patientInput.referringDoctorPhone
        },
        occupation: {
          role: args.patientInput.occupationRole,
          employer: args.patientInput.occupationEmployer,
          contact:{
            phone: args.patientInput.occupationEmployerContactPhone,
            email: args.patientInput.occupationEmployerContactEmail
          }
        }
      }
  );

      const result = await patient.save();

      return {
        ...result._doc,
        name: result.name,
        dob: result.dob,
        address: result.address,
        contact: {
          phone: result.contact.phone,
          email: result.contact.email
        },
        registrationDate: result.registrationDate,
        referringDoctor: {
          name: result.referringDoctor.name,
          email: result.referringDoctor.email,
          phone: result.referringDoctor.phone
        },
        occupation: {
          role: result.occupation.role,
          employer: result.occupation.employer,
          contact: {
            phone: result.occupation.contact.phone,
            email: result.occupation.contact.email
          }
        },
        insurance: {
          company: result.insuranceCompany,
          number: result.insuranceNumber,
          description: result.insuranceDescription,
          expiry: result.insuranceExpiry,
          subscriber: {
            company: result.insuranceSubscriberCompany,
            description: result.insuranceSubscriberDescription
          }
        },
      };
    } catch (err) {
      throw err;
    }
  }
};
