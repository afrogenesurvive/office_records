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
    console.log(`
      patients...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
    console.log(`
      getPatientId...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patient = await Patient.findById(args.patientId)
      .populate('appointments')
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
  getPatientField: async (args, req) => {
    console.log(`
      getPatientField...args: ${util.inspect(args)},
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

      const patients = await Patient.find(query)
      .populate('appointments')
      .populate('consultant.reference');

      return patients.map(patient => {
        return transformPatient(patient);

      });
    } catch (err) {
      throw err;
    }
  },
  getPatientNameRegex: async (args, req) => {
    console.log(`
      getPatientNameRegex...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {


      const patients = await Patient.find({name: {$regex: args.regex, $options: 'i'}})
      .populate('appointments')
      .populate('consultant.reference');

      return patients.map(patient => {
        return transformPatient(patient);

      });
    } catch (err) {
      throw err;
    }
  },
  getPatientDiagnosis: async (args, req) => {
    console.log(`
      getPatientDiagnosis...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patients = await Patient.find({'diagnosis.type': args.diagnosisType})
      .populate('appointments')
      .populate('consultant.reference');

      return patients.map(patient => {
        return transformPatient(patient);

      });
    } catch (err) {
      throw err;
    }
  },
  getPatientVisit: async (args, req) => {
    console.log(`
      getPatientVisit...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patientVisitDate = args.visitDate;
      console.log(`
          visit date: ${patientVisitDate}
        `);

      const visitPatient = await Patient.findById({_id: args.patientId});
      const visitConsultant = visitPatient.consultant.filter(x=> x.date === patientVisitDate);
      const visitComplaints = visitPatient.complaints.filter(x=> x.date === patientVisitDate);
      const visitSurveys = visitPatient.surveys.filter(x=> x.date === patientVisitDate);
      const visitVitals = visitPatient.vitals.filter(x=> x.date === patientVisitDate);
      const visitExamination = visitPatient.examination.filter(x=> x.date === patientVisitDate);
      const visitHistory = visitPatient.history.filter(x=> x.date === patientVisitDate);
      const visitAllergies = visitPatient.allergies.filter(x=> x.date === patientVisitDate);
      const visitMedication = visitPatient.medication.filter(x=> x.date === patientVisitDate);
      const visitInvestigation = visitPatient.investigation.filter(x=> x.date === patientVisitDate);
      const visitDiagnosis = visitPatient.diagnosis.filter(x=> x.date === patientVisitDate);
      const visitTreatment = visitPatient.treatment.filter(x=> x.date === patientVisitDate);
      const visitBilling = visitPatient.billing.filter(x=> x.date === patientVisitDate);

      const visit = {
        consultant: visitConsultant,
        complaints: visitComplaints,
        surveys: visitSurveys,
        vitals: visitVitals,
        examination: visitExamination,
        history: visitHistory,
        Aallergies: visitAllergies,
        medication: visitMedication,
        investigation: visitInvestigation,
        diagnosis: visitDiagnosis,
        treatment: visitTreatment,
        billing: visitBilling,
      }
      return  {
        visit
      };
    } catch (err) {
      throw err;
    }
  },
  updatePatient: async (args, req) => {
    console.log(`
      updatePatient...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{
        title: args.patientInput.title,
        name: args.patientInput.name,
        dob: args.patientInput.dob,
        age: args.patientInput.age,
        gender: args.patientInput.gender,
        address: {
          number: args.patientInput.addressNumber,
          street: args.patientInput.addressStreet,
          town: args.patientInput.addressTown,
          parish: args.patientInput.addressParish,
          postOffice: args.patientInput.addressPostOffice,
        },
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
        attendingPhysician: {
          name: args.patientInput.attendingPhysicianName,
          email: args.patientInput.attendingPhysicianEmail,
          phone: args.patientInput.attendingPhysicianPhone
        },
        occupation: {
          role: args.patientInput.occupationRole,
          employer: args.patientInput.occupationEmployer,
          contact:{
            phone: args.patientInput.occupationEmployerContactPhone,
            email: args.patientInput.occupationEmployerContactEmail
          }
        },

       }
      ,{new: true})
      .populate('appointments')
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
  updatePatientField: async (args, req) => {
    console.log(`
      updatePatientField...args:
      ${util.inspect(args)},
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

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},query,{new: true})
        .populate('appointments')
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
  updatePatientAppointment: async (args, req) => {
    console.log(`
      updatePatientAppointment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

        const patientAppointment = await Appointment.findById({_id:args.appointmentId});
        const patientAppointmentId = patientAppointment.id
        console.log("patientAppointment... " + patientAppointment.name);
        console.log("patientAppointmentId... " + patientAppointmentId);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {appointments:patientAppointment}},{new: true})
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientConsultant...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
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
    console.log(`
      updatePatientInsurance...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientNextOfKin...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientComplaint...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientComplaintObject =  {
            date: args.patientInput.complaintDate,
            title: args.patientInput.complaintTitle,
            description: args.patientInput.complaintDescription,
            anamnesis: args.patientInput.complaintAnamnesis,
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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientSurvey...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
        .populate('consultant.reference');

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
  updatePatientVitals: async (args, req) => {
    console.log(`
      updatePatientVitals...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const vitalsDate  = args.patientInput.vitalsDate;
      const vitalsPr  = args.patientInput.vitalsPr;
      const vitalsBp1  = args.patientInput.vitalsBp1;
      const vitalsBp2  = args.patientInput.vitalsBp2;
      const vitalsRr  = args.patientInput.vitalsRr;
      const vitalsTemp  = args.patientInput.vitalsTemp;
      const vitalsPs02 = args.patientInput.vitalsPs02;
      const vitalsHeight = args.patientInput.vitalsHeight;
      const vitalsWeight = args.patientInput.vitalsWeight;
      const vitalsBmi = args.patientInput.vitalsBmi;
      const vitalsUrineType = args.patientInput.vitalsUrineType;
      const vitalsUrineValue = args.patientInput.vitalsUrineValue;

      console.log(`
        vitalsDate: ${vitalsDate},
        vitalsPr: ${vitalsPr},
        vitalsBp1: ${vitalsBp1},
        vitalsBp2: ${vitalsBp2},
        vitalsRr: ${vitalsRr},
        vitalsTemp: ${vitalsTemp},
        vitalsPs02: ${vitalsPs02},
        vitalsHeight: ${vitalsHeight},
        vitalsWeight: ${vitalsWeight},
        vitalsBmi: ${vitalsBmi},
        vitalsUrineType: ${vitalsUrineType},
        vitalsUrineValue: ${vitalsUrineValue},
        `);


      const patientVitals = {
        date: vitalsDate,
        pr: vitalsPr,
        bp1: vitalsBp1,
        bp2: vitalsBp2,
        rr: vitalsRr,
        temp: vitalsTemp,
        ps02: vitalsPs02,
        height: vitalsHeight,
        weight: vitalsWeight,
        bmi: vitalsBmi,
        urine: {
          type: vitalsUrineType,
          value: vitalsUrineValue,
        }
      }

      console.log(" patientVitals: ", patientVitals);

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {vitals:patientVitals}},{new: true})
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientExamination...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientExaminationObject = {
            date: args.patientInput.examinationDate,
            general: args.patientInput.examinationGeneral,
            area: args.patientInput.examinationArea,
            type: args.patientInput.examinationType,
            measure: args.patientInput.examinationMeasure,
            value: args.patientInput.examinationValue,
            description: args.patientInput.examinationDescription,
            followUp: args.patientInput.examinationFollowUp,
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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientHistory...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientAllergies...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientAllergiesObject = {
            title: args.patientInput.allergiesTitle,
            type: args.patientInput.allergiesType,
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
        .populate('appointments')
        .populate('consultant.reference');

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
    console.log(`
      updatePatientMedication...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patientMedicationObject = {
            title: args.patientInput.medicationTitle,
            type: args.patientInput.medicationType,
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
        .populate('appointments')
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
  updatePatientInvestigation: async (args, req) => {
    console.log(`
      updatePatientInvestigation...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patientInvestigationObject = {
            date: args.patientInput.investigationDate,
            title: args.patientInput.investigationTitle,
            type: args.patientInput.investigationType,
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
        .populate('appointments')
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
  updatePatientDiagnosis: async (args, req) => {
    console.log(`
      updatePatientDiagnosis...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patientDiagnosisObject = {
            date: args.patientInput.diagnosisDate,
            title: args.patientInput.diagnosisTitle,
            type: args.patientInput.diagnosisType,
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
        .populate('appointments')
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
  updatePatientTreatment: async (args, req) => {
    console.log(`
      updatePatientTreatment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
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
  updatePatientBilling: async (args, req) => {
    console.log(`
      updatePatientBilling...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        .populate('appointments')
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
  updatePatientAttachment: async (args, req) => {
    console.log(`
      updatePatientAttachment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patientAttachmentObject = {
        name: args.patientInput.attachmentName,
        format: args.patientInput.attachmentFormat,
        path: args.patientInput.attachmentPath,
      }

        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {attachments:patientAttachmentObject}},{new: true})
        .populate('appointments')
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
  updatePatientNotes: async (args, req) => {
    console.log(`
      updatePatientNotes...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {notes:args.patientInput.notes}},{new: true})
        .populate('appointments')
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
  updatePatientTags: async (args, req) => {
    console.log(`
      updatePatientTags...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {tags:args.patientInput.tag}},{new: true})
        .populate('appointments')
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
  deletePatient: async (args, req) => {
    console.log(`
      deletePatient...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findByIdAndRemove(args.patientId);
        return {
          ...patient._doc,
          _id: patient.id,
          name: patient.name
        };
    } catch (err) {
      throw err;
    }
  },
  deletePatientAppointment: async (args, req) => {
    console.log(`
      deletePatientAppointment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { appointments: { _id: args.appointmentId}}},{new: true})
      .populate('appointments')
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
  deletePatientConsultant: async (args, req) => {
    console.log(`
      deletePatientConsultant...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const consultantObject = await User.findById({_id: args.consultantId});

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { consultant: { reference:consultantObject }}},{new: true})
      .populate('appointments')
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
  deletePatientInsurance: async (args, req) => {
    console.log(`
      deletePatientInsurance...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const insurance = {
        company: args.patientInput.insuranceCompany,
        number: args.patientInput.insuranceNumber,
        description: args.patientInput.insuranceDescription,
        subscriber: {
          company: args.patientInput.insuranceSubscriberCompany,
          description: args.patientInput.insuranceSubscriberDescription,
        }
      }
      console.log(`
        insurance: ${insurance},
        `);
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { insurance: insurance }},{new: true})
      .populate('appointments')
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
  deletePatientNextOfKin: async (args, req) => {
    console.log(`
      deletePatientNextOfKin...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const nextOfKin = {
        name: args.patientInput.nextOfKinName,
        contact: {
          phone: args.patientInput.nextOfKinPhone,
          email: args.patientInput.nextOfKinEmail
        }
      }
      console.log(`
        nextOfKin: ${util.inspect(nextOfKin)}
        `);
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { nextOfKin: nextOfKin}},{new: true})
      .populate('appointments')
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
  deletePatientComplaint: async (args, req) => {
    console.log(`
      deletePatientComplaint...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const complaint = {
        date: args.patientInput.complaintDate,
        title: args.patientInput.complaintTitle,
        description: args.patientInput.complaintDescription,
        anamnesis: args.patientInput.complaintAnamnesis,
        attachment:{
          name: args.patientInput.complaintAttachmentName,
          format: args.patientInput.complaintAttachmentFormat,
          path: args.patientInput.complaintAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { complaints: complaint}},{new: true})
      .populate('appointments')
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
  deletePatientSurvey: async (args, req) => {
    console.log(`
      deletePatientSurvey...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const survey = {
        date: args.patientInput.surveyDate,
        title: args.patientInput.surveyTitle,
        description: args.patientInput.surveyDescription,
        attachment:{
          name: args.patientInput.surveyAttachmentName,
          format: args.patientInput.surveyAttachmentFormat,
          path: args.patientInput.surveyAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { surveys: survey}},{new: true})
      .populate('appointments')
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
  deletePatientVitals: async (args, req) => {
    console.log(`
      deletePatientVitals...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const vitals = {
        date: args.patientInput.vitalsDate,
        pr: args.patientInput.vitalsPr,
        bp1: args.patientInput.vitalsBp1,
        bp2: args.patientInput.vitalsBp2,
        rr: args.patientInput.vitalsRr,
        temp: args.patientInput.vitalsTemp,
        ps02: args.patientInput.vitalsPs02,
        height: args.patientInput.vitalsHeight,
        weight: args.patientInput.vitalsWeight,
        bmi: args.patientInput.vitalsBmi,
        urine:{
          type: args.patientInput.vitalsUrineType,
          value: args.patientInput.vitalsUrineValue,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { vitals: vitals}},{new: true})
      .populate('appointments')
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
  deletePatientExamination: async (args, req) => {
    console.log(`
      deletePatientExamination...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const examination = {
        date: args.patientInput.examinationDate,
        general: args.patientInput.examinationGeneral,
        area: args.patientInput.examinationArea,
        type: args.patientInput.examinationType,
        measure: args.patientInput.examinationMeasure,
        value: args.patientInput.examinationValue,
        description: args.patientInput.examinationDescription,
        followUp: args.patientInput.examinationFollowUp,
        attachment:{
          name: args.patientInput.examinationAttachmentName,
          format: args.patientInput.examinationAttachmentFormat,
          path: args.patientInput.examinationAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { examination: examination }},{new: true})
      .populate('appointments')
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
  deletePatientHistory: async (args, req) => {
    console.log(`
      deletePatientHistory...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const history = {
        type: args.patientInput.historyType,
        date: args.patientInput.historyDate,
        title: args.patientInput.historyTitle,
        description: args.patientInput.historyDescription,
        attachment: {
          name: args.patientInput.historyAttachmentName,
          format: args.patientInput.historyAttachmentFormat,
          path: args.patientInput.historyAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { history: history }},{new: true})
      .populate('appointments')
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
  deletePatientAllergies: async (args, req) => {
    console.log(`
      deletePatientAllergies...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const allergies = {
        title: args.patientInput.allergiesTitle,
        type: args.patientInput.allergiesType,
        description: args.patientInput.allergiesDescription,
        attachment: {
          name: args.patientInput.allergiesAttachmentName,
          format: args.patientInput.allergiesAttachmentFormat,
          path: args.patientInput.allergiesAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { allergies: allergies }},{new: true})
      .populate('appointments')
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
  deletePatientMedication: async (args, req) => {
    console.log(`
      deletePatientMedication...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const medication = {
        title: args.patientInput.medicationTitle,
        type: args.patientInput.medicationType,
        description: args.patientInput.medicationDescription,
        attachment: {
          name: args.patientInput.medicationAttachmentName,
          format: args.patientInput.medicationAttachmentFormat,
          path: args.patientInput.medicationAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { medication: medication }},{new: true})
      .populate('appointments')
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
  deletePatientInvestigation: async (args, req) => {
    console.log(`
      deletePatientInvestigation...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const investigation = {
        date: args.patientInput.investigationDate,
        title: args.patientInput.investigationTitle,
        type: args.patientInput.investigationType,
        description: args.patientInput.investigationDescription,
        attachment: {
          name: args.patientInput.investigationAttachmentName,
          format: args.patientInput.investigationAttachmentFormat,
          path: args.patientInput.investigationAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { investigation: investigation }},{new: true})
      .populate('appointments')
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
  deletePatientDiagnosis: async (args, req) => {
    console.log(`
      deletePatientDiagnosis...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const diagnosis = {
        date: args.patientInput.diagnosisDate,
        title: args.patientInput.diagnosisTitle,
        type: args.patientInput.diagnosisType,
        description: args.patientInput.diagnosisDescription,
        attachment: {
          name: args.patientInput.diagnosisAttachmentName,
          format: args.patientInput.diagnosisAttachmentFormat,
          path: args.patientInput.diagnosisAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { diagnosis: diagnosis }},{new: true})
      .populate('appointments')
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
  deletePatientTreatment: async (args, req) => {
    console.log(`
      deletePatientTreatment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const treatment = {
        date: args.patientInput.treatmentDate,
        title: args.patientInput.treatmentTitle,
        type: args.patientInput.treatmentType,
        description: args.patientInput.treatmentDescription,
        dose: args.patientInput.treatmentDose,
        frequency: args.patientInput.treatmentFrequency,
        attachment: {
          name: args.patientInput.treatmentAttachmentName,
          format: args.patientInput.treatmentAttachmentFormat,
          path: args.patientInput.treatmentAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { treatment: treatment }},{new: true})
      .populate('appointments')
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
  deletePatientBilling: async (args, req) => {
    console.log(`
      deletePatientBilling...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const billing = {
        date: args.patientInput.billingDate,
        title: args.patientInput.billingTitle,
        type: args.patientInput.billingType,
        description: args.patientInput.billingDescription,
        amount: args.patientInput.billingAmount,
        paid: args.patientInput.billingPaid,
        attachment: {
          name: args.patientInput.billingAttachmentName,
          format: args.patientInput.billingAttachmentFormat,
          path: args.patientInput.billingAttachmentPath,
        }
      }
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { billing: billing }},{new: true})
      .populate('appointments')
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
  deletePatientAttachment: async (args, req) => {
    console.log(`
      deletePatientAttachment...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { attachments: { name: args.attachmentName }}},{new: true})
      .populate('appointments')
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
  deletePatientNote: async (args, req) => {
    console.log(`
      deletePatientNote...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { notes: args.note }},{new: true})
      .populate('appointments')
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
  deletePatientTag: async (args, req) => {
    console.log(`
      deletePatientTag...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { tags: args.tag }},{new: true})
      .populate('appointments')
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
  createPatient: async (args, req) => {
    console.log(`
      createPatient...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        title: args.patientInput.title,
        name: args.patientInput.name,
        dob: args.patientInput.dob,
        age: args.patientInput.age,
        gender: args.patientInput.gender,
        address: {
          number: args.patientInput.addressNumber,
          street: args.patientInput.addressStreet,
          town: args.patientInput.addressTown,
          parish: args.patientInput.addressParish,
          postOffice: args.patientInput.addressPostOffice,
        },
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
        attendingPhysician: {
          name: args.patientInput.attendingPhysicianName,
          email: args.patientInput.attendingPhysicianEmail,
          phone: args.patientInput.attendingPhysicianPhone
        },
        occupation: {
          role: args.patientInput.occupationRole,
          employer: args.patientInput.occupationEmployer,
          contact:{
            phone: args.patientInput.occupationEmployerContactPhone,
            email: args.patientInput.occupationEmployerContactEmail
          }
        },
        appointments: [],
        consultant: [],
        insurance: [{
          company: "",
          number: 0,
          description: "",
          expiry: 0,
          subscriber:{
            company: "",
            description: "",
            }
          }],
        nextOfKin: [{
            name: "",
            contact: {
              phone: 0,
              email: "",
            }
          }],
        complaints: [{
            date: 0,
            title: "",
            description: "",
            anamnesis: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        surveys: [{
            date: 0,
            title: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        vitals: [{
          date: 0,
          pr: 0,
          bp1: 0,
          bp2: 0,
          rr: 0,
          temp: 0,
          ps02: 0,
          height: 0,
          weight: 0,
          bmi: 0,
          urine: {
            type: "",
            value: "",
          }
        }],
        examination: [{
            date: 0,
            general: "",
            area: "",
            type: "",
            measure: "",
            value: "",
            description: "",
            followUp: false,
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        history: [{
            type: "",
            date: 0,
            title: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        allergies: [{
            type: "",
            title: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        medication: [{
            title: "",
            type: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        investigation: [{
            date: 0,
            type: "",
            title: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        diagnosis: [{
            date: 0,
            type: "",
            title: "",
            description: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        treatment: [{
            date: 0,
            type: "",
            title: "",
            description: "",
            dose: "",
            frequency: "",
            type: "",
            attachment:{
              name: "",
              format: "",
              path: "",
            }
          }],
        billing: [{
            date: 0,
            title: "",
            type: "",
            description: "",
            amount: 0,
            paid: null,
            attachment:{
              name: "",
              format: "",
              path: "",
            },
            notes: "",
          }],
        attachments: [{
          name: "",
          format: "",
          path: "",
        }],
        notes: [""],
        tags: [""],
      }
  );

      const result = await patient.save();

      return {
        ...result._doc,
        title: result.title,
        name: result.name,
        dob: result.dob,
        age: result.age,
        gender: result.gender,
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
