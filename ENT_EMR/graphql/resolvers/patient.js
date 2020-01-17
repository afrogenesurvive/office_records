const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');
const util = require('util');

const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');

const { transformPatient } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  patients: async (args, req) => {
    // console.log(`
    //   patients...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patients = await Patient.find({})
      .populate('appointments')
      .populate('consultant.reference');

      return patients.map(patient => {
        return transformPatient(patient);
      });
    } catch (err) {
      throw err;
    }
  },
  patientsNameAsc: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patients = await Patient.find({}).sort({ name: 1 })
      .populate('appointments')
      .populate('consultant.reference');

      return patients.map(patient => {
        return transformPatient(patient);
      });
    } catch (err) {
      throw err;
    }
  },
  patientsNameDesc: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patients = await Patient.find({}).sort({ name: -1 })
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const regex = "/^" + args.regex + "/";
      const patients = await Patient.find({'address.parish': {$regex: regex, $options: 'i'}})
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
  getPatientVisitDate: async (args, req) => {
    // console.log(`
    //   getPatientVisitDate...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);
  },
  updatePatient: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

        const resolverField = args.field;
        const resolverQuery = args.query;
        const query = {[resolverField]:resolverQuery};
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

        const patientAppointment = await Appointment.findById({_id:args.appointmentId});
        const patientAppointmentId = patientAppointment.id;
        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {appointments:patientAppointment}},{new: true})
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
  updatePatientConsultant: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const consultantDate = args.patientInput.consultantDate;
      const consultantReference = args.patientInput.consultantReference;
      const patientConsultant = await User.findById(consultantReference );
      const consultantObject = {
        date: consultantDate,
        reference: patientConsultant,
      };
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
          };
        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {insurance:patientInsuranceObject}},{new: true})
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
  updatePatientNextOfKin: async (args, req) => {

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
          };
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
          };
        const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {complaints:patientComplaintObject}},{new: true})
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
  updatePatientSurvey: async (args, req) => {

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
      const patientSurvey = {
        date: surveyDate,
        title: surveyTitle,
        description: surveyDescription,
        attachment: {
          name: surveyAttachmentName,
          format: surveyAttachmentFormat,
          path: surveyAttachmentPath,
        }
      };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {surveys:patientSurvey}},{new: true})
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
  updatePatientSystematicInquiry: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const systematicInquiryDate = args.patientInput.systematicInquiryDate;
      const systematicInquiryTitle = args.patientInput.systematicInquiryTitle;
      const systematicInquiryDescription = args.patientInput.systematicInquiryDescription;
      const systematicInquiryAttachmentName = args.patientInput.systematicInquiryAttachmentName;
      const systematicInquiryAttachmentFormat = args.patientInput.systematicInquiryAttachmentFormat;
      const systematicInquiryAttachmentPath = args.patientInput.systematicInquiryAttachmentPath;
      const patientSystematicInquiry = {
        date: systematicInquiryDate,
        title: systematicInquiryTitle,
        description: systematicInquiryDescription,
        attachment: {
          name: systematicInquiryAttachmentName,
          format: systematicInquiryAttachmentFormat,
          path: systematicInquiryAttachmentPath,
        }
      };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {systematicInquiry:patientSystematicInquiry}},{new: true})
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
  updatePatientVitals: async (args, req) => {

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
      };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {vitals:patientVitals}},{new: true})
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
  updatePatientExamination: async (args, req) => {

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
          };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {examination:patientExaminationObject}},{new: true})
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
  updatePatientHistory: async (args, req) => {

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
          };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {history:patientHistoryObject}},{new: true})
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
  updatePatientAllergies: async (args, req) => {

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
          };
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
          };
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
          };
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
          };
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
          };
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
          };
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
  updatePatientVigilance: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patientVigilanceObject = {
        date: args.patientInput.vigilanceDate,
        chronicIllness: {
          diabetes: {
            medication: args.patientInput.vigilanceChronicIllnessDiabetesMedication,
            testing: args.patientInput.vigilanceChronicIllnessDiabetesTesting,
            comment: args.patientInput.vigilanceChronicIllnessDiabetesComment
          },
          hbp: {
            medication: args.patientInput.vigilanceChronicIllnessHbpMedication,
            testing: args.patientInput.vigilanceChronicIllnessHbpTesting,
            comment: args.patientInput.vigilanceChronicIllnessHbpComment
          },
          dyslipidemia: {
            medication: args.patientInput.vigilanceChronicIllnessDyslipidemiaMedication,
            testing: args.patientInput.vigilanceChronicIllnessDyslipidemiaTesting,
            comment: args.patientInput.vigilanceChronicIllnessDyslipidemiaComment
          },
          cad: {
            medication: args.patientInput.vigilanceChronicIllnessCadMedication,
            testing: args.patientInput.vigilanceChronicIllnessCadTesting,
            comment: args.patientInput.vigilanceChronicIllnessCadComment
          }
        },
        lifestyle: {
          weight: {
            medication: args.patientInput.vigilanceLifestyleWeightMedication,
            testing: args.patientInput.vigilanceLifestyleWeightTesting,
            comment: args.patientInput.vigilanceLifestyleWeightComment
          },
          diet: {
            medication: args.patientInput.vigilanceLifestyleDietMedication,
            testing: args.patientInput.vigilanceLifestyleDietTesting,
            comment: args.patientInput.vigilanceLifestyleDietComment
          },
          smoking: {
            medication: args.patientInput.vigilanceLifestyleSmokingMedication,
            testing: args.patientInput.vigilanceLifestyleSmokingTesting,
            comment: args.patientInput.vigilanceLifestyleSmokingComment
          },
          substanceAbuse: {
            medication: args.patientInput.vigilanceLifestyleSubstanceAbuseMedication,
            testing: args.patientInput.vigilanceLifestyleSubstanceAbuseTesting,
            comment: args.patientInput.vigilanceLifestyleSubstanceAbuseComment
          },
          exercise: {
            medication: args.patientInput.vigilanceLifestyleExerciseMedication,
            testing: args.patientInput.vigilanceLifestyleExerciseTesting,
            comment: args.patientInput.vigilanceLifestyleExerciseComment
          },
          allergies: {
            medication: args.patientInput.vigilanceLifestyleAllergiesMedication,
            testing: args.patientInput.vigilanceLifestyleAllergiesTesting,
            comment: args.patientInput.vigilanceLifestyleAllergiesComment
          },
          asthma: {
            medication: args.patientInput.vigilanceLifestyleAsthmaMedication,
            testing: args.patientInput.vigilanceLifestyleAsthmaTesting,
            comment: args.patientInput.vigilanceLifestyleAsthmaComment
          }
        },
        screening: {
          breast: {
            medication: args.patientInput.vigilanceScreeningBreastMedication,
            testing: args.patientInput.vigilanceScreeningBreastTesting,
            comment: args.patientInput.vigilanceScreeningBreastComment
          },
          prostate: {
            medication: args.patientInput.vigilanceScreeningProstateMedication,
            testing: args.patientInput.vigilanceScreeningProstateTesting,
            comment: args.patientInput.vigilanceScreeningProstateComment
          },
          cervix: {
            medication: args.patientInput.vigilanceScreeningCervixMedication,
            testing: args.patientInput.vigilanceScreeningCervixTesting,
            comment: args.patientInput.vigilanceScreeningCervixComment
          },
          colon: {
            medication: args.patientInput.vigilanceScreeningColonMedication,
            testing: args.patientInput.vigilanceScreeningColonTesting,
            comment: args.patientInput.vigilanceScreeningColonComment
          },
          dental: {
            medication: args.patientInput.vigilanceScreeningDentalMedication,
            testing: args.patientInput.vigilanceScreeningDentalTesting,
            comment: args.patientInput.vigilanceScreeningDentalComment
          }
        },
        vaccines: {
          influenza: {
            medication: args.patientInput.vigilanceVaccinesInfluenzaMedication,
            testing: args.patientInput.vigilanceVaccinesInfluenzaTesting,
            comment: args.patientInput.vigilanceVaccinesInfluenzaComment
          },
          varicella: {
            medication: args.patientInput.vigilanceVaccinesVaricellaMedication,
            testing: args.patientInput.vigilanceVaccinesVaricellaTesting,
            comment: args.patientInput.vigilanceVaccinesVaricellaComment
          },
          hpv: {
            medication: args.patientInput.vigilanceVaccinesHpvMedication,
            testing: args.patientInput.vigilanceVaccinesHpvTesting,
            comment: args.patientInput.vigilanceVaccinesHpvComment
          },
          mmr: {
            medication: args.patientInput.vigilanceVaccinesMmrMedication,
            testing: args.patientInput.vigilanceVaccinesMmrTesting,
            comment: args.patientInput.vigilanceVaccinesMmrComment
          },
          tetanus: {
            medication: args.patientInput.vigilanceVaccinesTetanusMedication,
            testing: args.patientInput.vigilanceVaccinesTetanusTesting,
            comment: args.patientInput.vigilanceVaccinesTetanusComment
          },
          pneumovax: {
            medication: args.patientInput.vigilanceVaccinesPneumovaxMedication,
            testing: args.patientInput.vigilanceVaccinesPneumovaxTesting,
            comment: args.patientInput.vigilanceVaccinesPneumovaxComment
          },
          other: {
            name: args.patientInput.vigilanceVaccinesOtherName,
            medication: args.patientInput.vigilanceVaccinesOtherMedication,
            testing: args.patientInput.vigilanceVaccinesOtherTesting,
            comment: args.patientInput.vigilanceVaccinesOtherComment
          }
        }
      };
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$addToSet: {vigilance:patientVigilanceObject}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patientAttachmentObject = {
        name: args.patientInput.attachmentName,
        format: args.patientInput.attachmentFormat,
        path: args.patientInput.attachmentPath,
      };
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { appointments: { _id: args.appointmentId, date: new Date(args.appointmentDate)}}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const consultantObject = await User.findById({_id: args.consultantId});
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { consultant: { date: new Date(args.consultantDate) , reference:consultantObject }}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { insurance: { company: args.insuranceCompany, number: args.insuranceNumber } }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { nextOfKin: { name: args.nextOfKinName}}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { complaints: {date: new Date(args.complaintDate), title: args.complaintTitle}}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { surveys: {title: args.surveyTitle, date: new Date(args.surveyDate)}}},{new: true})
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
  deletePatientSystematicInquiry: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { systematicInquiry: {title: args.systematicInquiryTitle, date: new Date(args.systematicInquiryDate)}}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { vitals: {date: new Date(args.vitalsDate)}}},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { examination: {type: args.examinationType, date: new Date(args.examinationDate)} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { history: {date: new Date(args.historyDate), title: args.historyTitle} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { allergies: {title: args.allergiesTitle, type: args.allergiesType} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { medication: {title: args.medicationTitle, type: args.medicationType} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { investigation: {date: new Date(args.investigationDate), title: args.investigationTitle} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { diagnosis: {date: new Date(args.diagnosisDate), title: args.diagnosisTitle} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { treatment: {date: new Date(args.treatmentDate), title: args.treatmentTitle} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { billing: {date: new Date(args.billingDate), title: args.billingTitle} }},{new: true})
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
  deletePatientVigilance: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const patient = await Patient.findOneAndUpdate({_id:args.patientId},{$pull: { vigilance: {date: new Date(args.vigilanceDate)} }},{new: true})
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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const existingPatientName = await Patient.findOne({ name: args.patientInput.name, dob: new Date(args.patientInput.dob), registrationDate: new Date(args.patientInput.registrationDate)});
      if (existingPatientName) {
        throw new Error('Patient w/ that name, dob & reg date exists already.');
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
        systematicInquiry: [{
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
            paid: false,
            attachment:{
              name: "",
              format: "",
              path: "",
            },
            notes: "",
          }],
          vigilance:[{
            date: 0,
            chronicIllness: {
              diabetes: {
                medication: false,
                testing: false,
                comment: ""
              },
              hbp: {
                medication: false,
                testing: false,
                comment: ""
              },
              dyslipidemia: {
                medication: false,
                testing: false,
                comment: ""
              },
              cad: {
                medication: false,
                testing: false,
                comment: ""
              }
            },
            lifestyle: {
              weight: {
                medication: false,
                testing: false,
                comment: ""
              },
              diet: {
                medication: false,
                testing: false,
                comment: ""
              },
              smoking: {
                medication: false,
                testing: false,
                comment: ""
              },
              substanceAbuse: {
                medication: false,
                testing: false,
                comment: ""
              },
              exercise: {
                medication: false,
                testing: false,
                comment: ""
              },
              allergies: {
                medication: false,
                testing: false,
                comment: ""
              },
              asthma: {
                medication: false,
                testing: false,
                comment: ""
              }
            },
            screening: {
              breast: {
                medication: false,
                testing: false,
                comment: ""
              },
              prostate: {
                medication: false,
                testing: false,
                comment: ""
              },
              cervix: {
                medication: false,
                testing: false,
                comment: ""
              },
              colon: {
                medication: false,
                testing: false,
                comment: ""
              },
              dental: {
                medication: false,
                testing: false,
                comment: ""
              }
            },
            vaccines: {
              influenza: {
                medication: false,
                testing: false,
                comment: ""
              },
              varicella: {
                medication: false,
                testing: false,
                comment: ""
              },
              hpv: {
                medication: false,
                testing: false,
                comment: ""
              },
              mmr: {
                medication: false,
                testing: false,
                comment: ""
              },
              tetanus: {
                medication: false,
                testing: false,
                comment: ""
              },
              pneumovax: {
                medication: false,
                testing: false,
                comment: ""
              },
              other: {
                name: "",
                medication: false,
                testing: false,
                comment: ""
              }
            }
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
        attendingPhysician: {
          name: result.attendingPhysician.name,
          email: result.attendingPhysician.email,
          phone: result.attendingPhysician.phone
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
