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
      .populate('appointments')
      .populate('consultant.reference');

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
      const patients = await Patient.find(query);

      return patients.map(patient => {
        return transformPatient(patient);

      });
    } catch (err) {
      throw err;
    }
  },
  updatePatient: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatient...args:  ", util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      // const patientInsuranceObject = {
      //   company: args.patientInput.insuranceCompany,
      //   number: args.patientInput.insuranceNumber,
      //   description: args.patientInput.insuranceDescription,
      //   expiry: args.patientInput.insuranceExpiry,
      //   company: args.patientInput.insuranceSubscriberCompany,
      //   description: args.patientInput.insuranceSubscriberDescription
      // }
      // const patientNextOfKinObject = {
      //   name: args.patientInput.nextOfKinName,
      //   phone: args.patientInput.nextOfKinPhone,
      //   email: args.patientInput.nextOfKinEmail
      // }

      //
      // console.log(`
      //   updatePatientArray input objects:
      //   // insurance: ${JSON.stringify(patientInsuranceObject)}
      //   // nextOfKin: ${JSON.stringify(patientNextOfKinObject)}
      //   // complaint: ${JSON.stringify(patientComplaintObject)}
      //       examintion: ${JSON.stringify(patientExaminationObject)}
      //   // history: ${JSON.stringify(patientHistoryObject)}
      //   // allergies: ${JSON.stringify(patientAllergiesObject)}
      //   // medication: ${JSON.stringify(patientMedicationObject)}
      //   // investigation: ${JSON.stringify(patientInvestigationObject)}
      //   // diagnosis: ${JSON.stringify(patientDiagnosisObject)}
      //   // treatment: ${JSON.stringify(patientTreatmentObject)}
      //   // billing: ${JSON.stringify(patientBillingObject)}
      //   // `);


      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{
          name: args.patientInput.name,
          dob: args.patientInput.dob,
          age: args.patientInput.age,
          address: args.patientInput.address,
          contact: {
            phone: args.patientInput.contactPhone,
            email: args.patientInput.contactEmail
          },
          registrationDate: args.patientInput.registrationDate,
          referralDate: args.patientInput.referralDate,
          expirationDate: args.patientInput.expirationDate,
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
        //   $addToSet: {
        //     insurance: {
        //       company: args.patientInput.insuranceCompany,
        //       number: args.patientInput.insuranceNumber,
        //       description: args.patientInput.insuranceDescription,
        //       expiry: args.patientInput.insuranceExpiry,
        //       subscriber: {
        //         company: args.patientInput.insuranceSubscriberCompany,
        //         description: args.patientInput.insuranceSubscriberDescription
        //       }
        //     },
        //     nextOfKin: {
        //       name: args.patientInput.nextOfKinName,
        //       contact: {
        //         email: args.patientInput.nextOfKinEmail,
        //         phone: args.patientInput.nextOfKinPhone
        //       }
        //     },
        //     complaints: {
        //       date: args.patientInput.complaintDate,
        //       title: args.patientInput.complaintTitle,
        //       description: args.patientInput.complaintDescription,
        //       attachment: {
        //         name: args.patientInput.complaintAttachmentName,
        //         format: args.patientInput.complaintAttachmentFormat,
        //         path: args.patientInput.complaintAttachmentPath
        //       }
        //     },
        //     examination: {
        //       area: args.patientInput.examinationArea,
        //       type: args.patientInput.examinationType,
        //       measure: args.patientInput.examinationMeasure,
        //       value: args.patientInput.examinationValue,
        //       description: args.patientInput.examinationDescription,
        //       attachment: {
        //         name: args.patientInput.examinationAttachmentName,
        //         format: args.patientInput.examinationAttachmentFormat,
        //         path: args.patientInput.examinationAttachmentPath
        //       }
        //     },
        //     history: {
        //       title: args.patientInput.historyTitle,
        //       type: args.patientInput.historyType,
        //       date: args.patientInput.historyDate,
        //       description: args.patientInput.historyDescription,
        //       attachment: {
        //         name: args.patientInput.historyAttachmentName,
        //         format: args.patientInput.historyAttachmentFormat,
        //         path: args.patientInput.historyAttachmentPath
        //       }
        //     },
        //     allergies: {
        //       title: args.patientInput.allergiesTitle,
        //       description: args.patientInput.allergiesDescription,
        //       attachment: {
        //         name: args.patientInput.allergiesAttachmentName,
        //         format: args.patientInput.allergiesAttachmentFormat,
        //         path: args.patientInput.allergiesAttachmentPath
        //       },
        //     },
        //     medication: {
        //       title: args.patientInput.medicationTitle,
        //       description: args.patientInput.medicationDescription,
        //       attachment: {
        //         name: args.patientInput.medicationAttachmentName,
        //         format: args.patientInput.medicationAttachmentFormat,
        //         path: args.patientInput.medicationAttachmentPath
        //       }
        //     },
        //     investigation: {
        //       date: args.patientInput.investigationDate,
        //       title: args.patientInput.investigationTitle,
        //       description: args.patientInput.investigationDescription,
        //       attachment: {
        //         name: args.patientInput.investigationAttachmentName,
        //         format: args.patientInput.investigationAttachmentFormat,
        //         path: args.patientInput.investigationAttachmentPath
        //       }
        //     },
        //     diagnosis: {
        //       date: args.patientInput.diagnosisDate,
        //       title: args.patientInput.diagnosisTitle,
        //       description: args.patientInput.diagnosisDescription,
        //       attachment: {
        //         name: args.patientInput.diagnosisAttachmentName,
        //         format: args.patientInput.diagnosisAttachmentFormat,
        //         path: args.patientInput.diagnosisAttachmentPath
        //       }
        //     },
        //     treatment: {
        //       date: args.patientInput.treatmentDate,
        //       title: args.patientInput.treatmentTitle,
        //       type: args.patientInput.treatmentType,
        //       description: args.patientInput.treatmentDescription,
        //       dose: args.patientInput.treatmentDose,
        //       frequency: args.patientInput.treatmentFrequency,
        //       attachment: {
        //         name: args.patientInput.treatmentAttachmentName,
        //         format: args.patientInput.treatmentAttachmentFormat,
        //         path: args.patientInput.treatmentAttachmentPath
        //       }
        //     },
        //     billing: {
        //       date: args.patientInput.billingDate,
        //       title: args.patientInput.billingTitle,
        //       type: args.patientInput.billingType,
        //       description: args.patientInput.billingDescription,
        //       amount: args.patientInput.billingAmount,
        //       paid: args.patientInput.billingPaid,
        //       notes: args.patientInput.billingNotes,
        //       attachment: {
        //         name: args.patientInput.billingAttachmentName,
        //         format: args.patientInput.billingAttachmentFormat,
        //         path: args.patientInput.billingAttachmentPath
        //       }
        //     }
        // }
        //   $addToSet: {
        //     insurance: patientInsuranceObject,
        //         nextOfKin: patientNextOfKinObject,
        //         complaint: patientComplaintObject,
        //         examination: patientExaminationObject,
        //         history: patientHistoryObject,
        //         allergies: patientAllergiesObject,
        //         medication: patientMedicationObject,
        //         investigation: patientInvestigationObject,
        //         diagnosis: patientDiagnosisObject,
        //         treatment: patientTreatmentObject,
        //         billing: patientBillingObject
        // }
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
  updatePatientConsultant: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientConsultant...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const consultantDate = args.patientInput.consultantDate;
      const consultantReference = args.patientInput.consultantReference;
      console.log(`
        consultantDate:${consultantDate},
        consultantReference:${consultantReference},
        `);

      const patientConsultant = await User.findById(consultantReference );
      console.log("patientConsultant:  ", patientConsultant);

      const consultantObject = {
        date: consultantDate,
        reference: patientConsultant,
      }

      console.log(" consultantObject: ", consultantObject);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {consultant:consultantObject}},{new: true})
        .populate('consultant.reference');

          return {
              ...patient._doc,
              _id: patient.id,
              name: patient.name
          };
    } catch (err) {
      throw err;
    }
  },
  updatePatientInsurance: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientInsurance...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientInsuranceObject =  {
            company: args.patientInput.insuranceCompany,
            number: args.patientInput.insuranceNumber,
            description: args.patientInput.insuranceDescription,
            expiry: args.patientInput.insuranceExpiry,
            subscriber: {
              company: args.patientInput.insuranceSubscriberCompany,
              description: args.patientInput.insuranceSubscriberDescription
            }
          }

      console.log(`
        patientInsuranceObject: ${patientInsuranceObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {insurance:patientInsuranceObject}},{new: true})

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
  updatePatientNextOfKin: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientNextOfKin...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientNextOfKinObject =  {
            name: args.patientInput.nextOfKinName,
            contact: {
              email: args.patientInput.nextOfKinEmail,
              phone: args.patientInput.nextOfKinPhone
            }
          }

      console.log(`
        patientNextOfKinObject: ${patientNextOfKinObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {nextOfKin:patientNextOfKinObject}},{new: true})

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
  updatePatientComplaint: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientComplaint...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientComplaintObject =  {
            date: args.patientInput.complaintDate,
            title: args.patientInput.complaintTitle,
            description: args.patientInput.complaintDescription,
            attachment: {
              name: args.patientInput.complaintAttachmentName,
              format: args.patientInput.complaintAttachmentFormat,
              path: args.patientInput.complaintAttachmentPath
            }
          }

      console.log(`
        patientComplaintObject: ${patientComplaintObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {complaints:patientComplaintObject}},{new: true})

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
  updatePatientSurvey: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientSurvey...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const surveyDate = args.patientInput.surveyDate;
      const surveyTitle = args.patientInput.surveyTitle;
      const surveyDescription = args.patientInput.surveyDescription;
      const surveyAttachmentName = args.patientInput.surveyAttachmentName;
      const surveyAttachmentFormat = args.patientInput.surveyAttachmentFormat;
      const surveyAttachmentPath = args.patientInput.surveyAttachmentPath;

      console.log(`
        surveyDate: ${surveyDate},
        surveyTitle: ${surveyTitle},
        surveyDescription: ${surveyDescription},
        surveyAttachmentName: ${surveyAttachmentName},
        surveyAttachmentFormat: ${surveyAttachmentFormat},
        surveyAttachmentPath: ${surveyAttachmentPath},
        `);


      const patientSurvey = {
        date: surveyDate,
        title: surveyTitle,
        description: surveyDescription,
        attachment: {
          name: surveyAttachmentName,
          format: surveyAttachmentFormat,
          path: surveyAttachmentPath,
        }
      }

      console.log(" patientSurvey: ", patientSurvey);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {surveys:patientSurvey}},{new: true})

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
  updatePatientExamination: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientExamination...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientExaminationObject = {
            date: args.patientInput.examinationDate,
            area: args.patientInput.examinationArea,
            type: args.patientInput.examinationType,
            measure: args.patientInput.examinationMeasure,
            value: args.patientInput.examinationValue,
            description: args.patientInput.examinationDescription,
            attachment: {
              name: args.patientInput.examinationAttachmentName,
              format: args.patientInput.examinationAttachmentFormat,
              path: args.patientInput.examinationAttachmentPath
            }
          }

      console.log(`
        patientExaminationObject: ${patientExaminationObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {examination:patientExaminationObject}},{new: true})

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
  updatePatientHistory: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientHistory...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientHistoryObject = {
            title: args.patientInput.historyTitle,
            type: args.patientInput.historyType,
            date: args.patientInput.historyDate,
            description: args.patientInput.historyDescription,
            attachment: {
              name: args.patientInput.historyAttachmentName,
              format: args.patientInput.historyAttachmentFormat,
              path: args.patientInput.historyAttachmentPath
            }
          }

      console.log(`
        patientHistoryObject: ${patientHistoryObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {history:patientHistoryObject}},{new: true})

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
  updatePatientAllergies: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientAllergies...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientAllergiesObject = {
            title: args.patientInput.allergiesTitle,
            description: args.patientInput.allergiesDescription,
            attachment: {
              name: args.patientInput.allergiesAttachmentName,
              format: args.patientInput.allergiesAttachmentFormat,
              path: args.patientInput.allergiesAttachmentPath
            },
          }

      console.log(`
        patientAllergiesObject: ${patientAllergiesObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {allergies:patientAllergiesObject}},{new: true})

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
  updatePatientMedication: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientMedication...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientMedicationObject = {
            title: args.patientInput.medicationTitle,
            description: args.patientInput.medicationDescription,
            attachment: {
              name: args.patientInput.medicationAttachmentName,
              format: args.patientInput.medicationAttachmentFormat,
              path: args.patientInput.medicationAttachmentPath
            }
          }

      console.log(`
        patientMedicationObject: ${patientMedicationObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {medication:patientMedicationObject}},{new: true})

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
  updatePatientInvestigation: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientInvestigation...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientInvestigationObject = {
            date: args.patientInput.investigationDate,
            title: args.patientInput.investigationTitle,
            description: args.patientInput.investigationDescription,
            attachment: {
              name: args.patientInput.investigationAttachmentName,
              format: args.patientInput.investigationAttachmentFormat,
              path: args.patientInput.investigationAttachmentPath
            }
          }

      console.log(`
        patientInvestigationObject: ${patientInvestigationObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {investigation:patientInvestigationObject}},{new: true})

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
  updatePatientDiagnosis: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientDiagnosis...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientDiagnosisObject = {
            date: args.patientInput.diagnosisDate,
            title: args.patientInput.diagnosisTitle,
            description: args.patientInput.diagnosisDescription,
            attachment: {
              name: args.patientInput.diagnosisAttachmentName,
              format: args.patientInput.diagnosisAttachmentFormat,
              path: args.patientInput.diagnosisAttachmentPath
            }
          }

      console.log(`
        patientDiagnosisObject: ${patientDiagnosisObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {diagnosis:patientDiagnosisObject}},{new: true})

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
  updatePatientTreatment: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientTreatment...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientTreatmentObject = {
            date: args.patientInput.treatmentDate,
            title: args.patientInput.treatmentTitle,
            type: args.patientInput.treatmentType,
            description: args.patientInput.treatmentDescription,
            dose: args.patientInput.treatmentDose,
            frequency: args.patientInput.treatmentFrequency,
            attachment: {
              name: args.patientInput.treatmentAttachmentName,
              format: args.patientInput.treatmentAttachmentFormat,
              path: args.patientInput.treatmentAttachmentPath
            }
          }

      console.log(`
        patientTreatmentObject: ${patientTreatmentObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {treatment:patientTreatmentObject}},{new: true})

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
  updatePatientBilling: async (args, req) => {
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("updatePatientBilling...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientBillingObject = {
            date: args.patientInput.billingDate,
            title: args.patientInput.billingTitle,
            type: args.patientInput.billingType,
            description: args.patientInput.billingDescription,
            amount: args.patientInput.billingAmount,
            paid: args.patientInput.billingPaid,
            notes: args.patientInput.billingNotes,
            attachment: {
              name: args.patientInput.billingAttachmentName,
              format: args.patientInput.billingAttachmentFormat,
              path: args.patientInput.billingAttachmentPath
            }
          }

      console.log(`
        patientBillingObject: ${patientBillingObject}
        `);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {billing:patientBillingObject}},{new: true})

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
        age: args.patientInput.age,
        address: args.patientInput.address,
        contact: {
          phone: args.patientInput.contactPhone,
          email: args.patientInput.contactEmail
        },
        registrationDate: args.patientInput.registrationDate,
        referralDate: args.patientInput.referralDate,
        expirationDate: args.patientInput.expirationDate,
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
        age: result.age,
        address: result.address,
        contact: {
          phone: result.contact.phone,
          email: result.contact.email
        },
        registrationDate: result.registrationDate,
        referralDate: result.referralDate,
        expirationDate: result.expirationDate,
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
        }
      };
    } catch (err) {
      throw err;
    }
  }
};
