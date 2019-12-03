
const { GraphQLObjectType, GraphQLString } = require('graphql')
const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  email: String
  password: String
  name: String
  role: String
  employmentDate: String
  terminationDate: String
  attachments: [Attachment]
  attendance: [Attendance]
  leave: [Leave]
}

type Attachment {
  name: String
  format: String
  path: String
}
type Attendance {
  date: String
  status: String
  description: String
}
type Leave {
  type: String
  startDate: String
  endDate: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}


type Patient {
  _id: ID!
  name: String
  dob: String
  age: String
  address: String
  registrationDate: String
  referralDate: String
  expirationDate: String
  referringDoctor: referringDoctor
  contact: Contact
  appointments: [Appointment]
  consultant: [Consultant]
  occupation: PatientOccupation
  nextOfKin: [NextOfKin]
  insurance: [Insurance]
  complaints: [Complaint]
  surveys: [Survey]
  examination: [Examination]
  history: [History]
  allergies: [Allergy]
  medication: [Medication]
  investigation: [Investigation]
  diagnosis: [Diagnosis]
  treatment: [Treatment]
  billing: [Billing]
  notes: [String]
  tags: [String]
}

type Consultant {
  date: String
  reference: User
}
type referringDoctor {
  name: String
  email: String
  phone: String
}
type Contact {
  email: String
  phone: String
}
type PatientOccupation {
  role: String
  employer: String
  contact: Contact
}
type NextOfKin {
  name: String
  contact: Contact
}
type Insurance {
  company: String
  number: String
  description: String
  expiry: String
  subscriber: InsuranceSubscriber
}
type InsuranceSubscriber {
  company: String
  description: String
}
type Complaint {
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Survey {
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Examination {
  date: String
  area: String
  type: String
  measure: String
  value: String
  description: String
  attachment: Attachment
}
type History {
  type: String
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Allergy {
  title: String
  description: String
  attachment: Attachment
}
type Medication {
  title: String
  description: String
  attachment: Attachment
}
type Investigation {
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Diagnosis {
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Treatment {
  date: String
  title: String
  description: String
  dose: String
  frequency: String
  type: String
  attachment: Attachment
}

type Billing {
  date: String
  title: String
  type: String
  description: String
  amount: Float
  paid: Boolean
  notes: String
  attachment: Attachment
}

type Appointment {
  _id: ID!
  title: String
  type: String
  date: String
  time: String
  location: String
  description: String
  patient: Patient
  inProgress: Boolean
  attended: Boolean
  important: Boolean
  notes: [String]
}


input UserInput {
  email: String
  password: String
  name: String
  role: String
  employmentDate: String
  terminationDate: String
  attachmentName: String
  attachmentFormat: String
  attachmentPath: String
  attendanceDate: String
  attendanceStatus: String
  attendanceDescription: String
  leaveType: String
  leaveStartDate: String
  leaveEndDate: String
}


input PatientInput {
  name: String
  dob: String
  age: Int
  address: String
  contactPhone: String
  contactEmail: String
  registrationDate: String
  referralDate: String
  expirationDate: String
  referringDoctorName: String
  referringDoctorEmail: String
  referringDoctorPhone: String
  appointment: String
  consultantDate: String
  consultantReference: String
  occupationRole: String
  occupationEmployer: String
  occupationEmployerContactPhone: String
  occupationEmployerContactEmail: String
  nextOfKinName: String
  nextOfKinPhone: String
  nextOfKinEmail: String
  insuranceCompany: String
  insuranceNumber: String
  insuranceDescription: String
  insuranceExpiry: String
  insuranceSubscriberCompany: String
  insuranceSubscriberDescription: String
  complaintDate: String
  complaintTitle: String
  complaintDescription: String
  complaintAttachmentName: String
  complaintAttachmentFormat: String
  complaintAttachmentPath: String
  surveyDate: String
  surveyTitle: String
  surveyDescription: String
  surveyAttachmentName: String
  surveyAttachmentFormat: String
  surveyAttachmentPath: String
  examinationArea: String
  examinationType: String
  examinationMeasure: String
  examinationValue: String
  examinationDescription: String
  examinationAttachmentName: String
  examinationAttachmentFormat: String
  examinationAttachmentPath: String
  historyType: String
  historyDate: String
  historyTitle: String
  historyDescription: String
  historyAttachmentName: String
  historyAttachmentFormat: String
  historyAttachmentPath: String
  allergiesTitle: String
  allergiesDescription: String
  allergiesAttachmentName: String
  allergiesAttachmentFormat: String
  allergiesAttachmentPath: String
  medicationTitle: String
  medicationDescription: String
  medicationAttachmentName: String
  medicationAttachmentFormat: String
  medicationAttachmentPath: String
  investigationDate: String
  investigationTitle: String
  investigationDescription: String
  investigationAttachmentName: String
  investigationAttachmentFormat: String
  investigationAttachmentPath: String
  diagnosisDate: String
  diagnosisTitle: String
  diagnosisDescription: String
  diagnosisAttachmentName: String
  diagnosisAttachmentFormat: String
  diagnosisAttachmentPath: String
  treatmentDate: String
  treatmentTitle: String
  treatmentDescription: String
  treatmentDose: String
  treatmentFrequency: String
  treatmentType: String
  treatmentAttachmentName: String
  treatmentAttachmentFormat: String
  treatmentAttachmentPath: String
  billingDate: String
  billingTitle: String
  billingType: String
  billingDescription: String
  billingAmount: Float
  billingPaid: Boolean
  billingAttachmentName: String
  billingAttachmentFormat: String
  billingAttachmentPath: String
  billingNotes: String
  notes: String
  tag: String
}

input AppointmentInput {
  title: String
  type: String
  date: String
  time: String
  location: String
  description: String
  inProgress: Boolean
  attended: Boolean
  important: Boolean
  notes: String
}

type RootQuery {

    users(userId: ID!): [User]
    getUserId(userId: ID! otherUserId: ID!): User
    getUserField(userId: ID!, field: String!, query: String!): [User]
    getThisUser: User

    patients(userId: ID!): [Patient]
    getPatientId(patientId: ID! userId: ID!): Patient
    getPatientField(userId: ID!, field: String!, query: String!): [Patient]

    appointments(userId: ID!): [Appointment]
    getAppointmentId(appointmentId: ID! userId: ID!): Appointment
    getAppointmentField(userId: ID!, field: String!, query: String!): [Appointment]
    getAppointmentDateRange(userId: ID!, startDate: String!, endDate: String!): [Appointment]
    getAppointmentToday(userId: ID!): [Appointment]
    getAppointmentWeek(userId: ID!): [Appointment]
    getAppointmentWeekImportant(userId: ID!): [Appointment]

    login(email: String!, password: String!): AuthData!

}

type RootMutation {

    createUser(userInput: UserInput!): User
    updateUser(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserAttachment(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserAttendance(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserLeave(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserField(userId: ID!, selectedUserId: ID!, field: String!, query: String!): User
    deleteUser(userId: ID!, selectedUserId: ID!): User

    createPatient(userId: ID!, patientInput: PatientInput!): Patient
    updatePatient(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientArray(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientField(userId: ID!, patientId: ID!, field: String!, query: String!): Patient
    updatePatientAppointment(userId: ID!, patientId: ID!, appointmentId: ID!): Patient
    updatePatientConsultant(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientInsurance(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientNextOfKin(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientComplaint(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientSurvey(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientExamination(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientHistory(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientAllergies(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientMedication(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientInvestigation(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientDiagnosis(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientTreatment(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientBilling(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    deletePatient(userId: ID!, patientId: ID!): Patient

    createAppointment(userId: ID!, patientId: ID!, appointmentInput: AppointmentInput!): Appointment
    updateAppointment(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentNotes(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentField(userId: ID!, appointmentId: ID!, field: String!, query: String!): Appointment
    updateAppointmentFieldArray(userId: ID!, appointmentId: ID!, field: String!, query: String!): Appointment
    updateAppointmentPatient(userId: ID!, appointmentId: ID!, patientId: ID!): Appointment
    deleteAppointment(userId: ID!, appointmentId: ID!): Appointment

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
