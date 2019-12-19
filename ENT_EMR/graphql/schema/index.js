
const { GraphQLObjectType, GraphQLString } = require('graphql')
const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  email: String
  password: String
  name: String
  dob: String
  address: Address
  phone: String
  role: String
  employmentDate: String
  terminationDate: String
  attachments: [Attachment]
  attendance: [Attendance]
  leave: [Leave]
}

type Address {
  number: Int
  street: String
  town: String
  parish: String
  postOffice: String
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
  title: String
  startDate: String
  endDate: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  error: String
}


type Patient {
  _id: ID!
  title: String
  name: String
  dob: String
  age: Int
  gender: String
  address: Address
  registrationDate: String
  referralDate: String
  expirationDate: String
  attendingPhysician: AttendingPhysician
  referringDoctor: ReferringDoctor
  contact: Contact
  appointments: [Appointment]
  consultant: [Consultant]
  occupation: PatientOccupation
  nextOfKin: [NextOfKin]
  insurance: [Insurance]
  complaints: [Complaint]
  surveys: [Survey]
  vitals: [Vitals]
  examination: [Examination]
  history: [History]
  allergies: [Allergy]
  medication: [Medication]
  investigation: [Investigation]
  diagnosis: [Diagnosis]
  treatment: [Treatment]
  billing: [Billing]
  attachments: [Attachment]
  notes: [String]
  tags: [String]
}

type Consultant {
  date: String
  reference: User
}
type ReferringDoctor {
  name: String
  email: String
  phone: String
}
type AttendingPhysician {
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
  anamnesis: String
  attachment: Attachment
}
type Survey {
  date: String
  title: String
  description: String
  attachment: Attachment
}
type Vitals {
  date: String
  pr: Float
  bp1: Float
  bp2: Float
  rr: Float
  temp: Float
  ps02: Float
  height: Float
  weight: Float
  bmi: Float
  urine: Urine
}
type Urine {
  type: String
  value: String
}
type Examination {
  date: String
  general: String
  area: String
  type: String
  measure: String
  value: String
  description: String
  followUp: Boolean
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
  type: String
  title: String
  description: String
  attachment: Attachment
}
type Medication {
  title: String
  type: String
  description: String
  attachment: Attachment
}
type Investigation {
  date: String
  type: String
  title: String
  description: String
  attachment: Attachment
}
type Diagnosis {
  date: String
  type: String
  title: String
  description: String
  attachment: Attachment
}
type Treatment {
  date: String
  title: String
  type: String
  description: String
  dose: String
  frequency: String
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
  checkinTime: String
  seenTime: String
  location: String
  description: String
  patient: Patient
  inProgress: Boolean
  attended: Boolean
  important: Boolean
  notes: [String]
}

type Visit {
  date: String
  patient: Patient
  consultant: [Consultant]
  complaints: [Complaint]
  surveys: [Survey]
  vitals: [Vitals]
  examination: [Examination]
  history: [History]
  allergies: [Allergy]
  medication: [Medication]
  investigation: [Investigation]
  diagnosis: [Diagnosis]
  treatment: [Treatment]
  billing: [Billing]
}


input UserInput {
  email: String
  password: String
  name: String
  dob: String
  addressNumber: Int
  addressStreet: String
  addressTown: String
  addressParish: String
  addressPostOffice: String
  phone: String
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
  leaveTitle: String
  leaveStartDate: String
  leaveEndDate: String
}


input PatientInput {
  title: String
  name: String
  dob: String
  age: Int
  gender: String
  addressNumber: Int
  addressStreet: String
  addressTown: String
  addressParish: String
  addressPostOffice: String
  contactPhone: String
  contactEmail: String
  registrationDate: String
  referralDate: String
  expirationDate: String
  attendingPhysicianName: String
  attendingPhysicianEmail: String
  attendingPhysicianPhone: String
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
  complaintAnamnesis: String
  complaintAttachmentName: String
  complaintAttachmentFormat: String
  complaintAttachmentPath: String
  surveyDate: String
  surveyTitle: String
  surveyDescription: String
  surveyAttachmentName: String
  surveyAttachmentFormat: String
  surveyAttachmentPath: String
  vitalsDate: String
  vitalsPr: Float
  vitalsBp1: Float
  vitalsBp2: Float
  vitalsRr: Float
  vitalsTemp: Float
  vitalsPs02: Float
  vitalsHeight: Float
  vitalsWeight: Float
  vitalsBmi: Float
  vitalsUrineType: String
  vitalsUrineValue: String
  examinationDate: String
  examinationGeneral: String
  examinationArea: String
  examinationType: String
  examinationMeasure: String
  examinationValue: String
  examinationDescription: String
  examinationFollowUp: Boolean
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
  allergiesType: String
  allergiesDescription: String
  allergiesAttachmentName: String
  allergiesAttachmentFormat: String
  allergiesAttachmentPath: String
  medicationTitle: String
  medicationType: String
  medicationDescription: String
  medicationAttachmentName: String
  medicationAttachmentFormat: String
  medicationAttachmentPath: String
  investigationDate: String
  investigationTitle: String
  investigationType: String
  investigationDescription: String
  investigationAttachmentName: String
  investigationAttachmentFormat: String
  investigationAttachmentPath: String
  diagnosisDate: String
  diagnosisTitle: String
  diagnosisType: String
  diagnosisDescription: String
  diagnosisAttachmentName: String
  diagnosisAttachmentFormat: String
  diagnosisAttachmentPath: String
  treatmentDate: String
  treatmentTitle: String
  treatmentType: String
  treatmentDescription: String
  treatmentDose: String
  treatmentFrequency: String
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
  attachmentName: String
  attachmentPath: String
  attachmentFormat: String
  notes: String
  tag: String
}

input AppointmentInput {
  title: String
  type: String
  date: String
  time: String
  checkinTime: String
  seenTime: String
  location: String
  description: String
  inProgress: Boolean
  attended: Boolean
  important: Boolean
  notes: String
}

type RootQuery {

    users(userId: ID!): [User]
    usersNameAsc(userId: ID!): [User]
    usersNameDesc(userId: ID!): [User]
    getUserId(userId: ID! selectedUserId: ID!): User
    getUserField(userId: ID!, field: String!, query: String!): [User]
    getUserAttendanceDate(userId: ID!, attendanceDate: String!): [User]
    getUserLeaveDateRange(userId: ID!, startDate: String, endDate: String!): [User]
    getThisUser: User

    patients(userId: ID!): [Patient]
    patientsNameAsc(userId: ID!): [Patient]
    patientsNameDesc(userId: ID!): [Patient]
    getPatientId(patientId: ID! userId: ID!): Patient
    getPatientField(userId: ID!, field: String!, query: String!): [Patient]
    getPatientVisit(userId: ID!, patientId: ID!, visitDate: String!): Visit
    getPatientNameRegex(userId: ID!, regex: String!): [Patient]
    getPatientDiagnosis(userId: ID!, diagnosisType: String!): [Patient]

    appointments(userId: ID!): [Appointment]
    appointmentsDateAsc(userId: ID!): [Appointment]
    appointmentsDateDesc(userId: ID!): [Appointment]
    getAppointmentId(appointmentId: ID! userId: ID!): Appointment
    getAppointmentField(userId: ID!, field: String!, query: String!): [Appointment]
    getAppointmentPatient(userId: ID!, patientId: ID!): [Appointment]
    getAppointmentDate(userId: ID!, date: String!): [Appointment]
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
    updateUserAttendanceToday(userId: ID!, selectedUserId: ID!): User
    updateUserLeave(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserField(userId: ID!, selectedUserId: ID!, field: String!, query: String!): User

    deleteUser(userId: ID!, selectedUserId: ID!): User
    deleteUserLeave(userId: ID!, selectedUserId: ID!, leaveTitle: String! ): User
    deleteUserAttendance(userId: ID!, selectedUserId: ID!, attendanceDate: String!): User
    deleteUserAttachment(userId: ID!, selectedUserId: ID!, attachmentName: String!): User

    createPatient(userId: ID!, patientInput: PatientInput!): Patient
    updatePatient(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientField(userId: ID!, patientId: ID!, field: String!, query: String!): Patient
    updatePatientAppointment(userId: ID!, patientId: ID!, appointmentId: ID!): Patient
    updatePatientConsultant(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientInsurance(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientNextOfKin(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientComplaint(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientSurvey(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientVitals(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientExamination(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientHistory(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientAllergies(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientMedication(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientInvestigation(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientDiagnosis(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientTreatment(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientBilling(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientAttachment(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientNotes(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientTags(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient

    deletePatient(userId: ID!, patientId: ID!): Patient
    deletePatientAppointment(userId: ID!, patientId: ID!, appointmentId: ID!): Patient
    deletePatientConsultant(userId: ID!, patientId: ID!, consultantId: ID!): Patient
    deletePatientInsurance(userId: ID!, patientId: ID!, insuranceCompany: String!, insuranceNumber: String! ): Patient
    deletePatientNextOfKin(userId: ID!, patientId: ID!, nextOfKinName: String!): Patient
    deletePatientComplaint(userId: ID!, patientId: ID!, complaintTitle: String!, complaintDate: String!): Patient
    deletePatientSurvey(userId: ID!, patientId: ID!, surveyTitle: String!, surveyDate: String!): Patient
    deletePatientVitals(userId: ID!, patientId: ID!, vitalsDate: String!): Patient
    deletePatientExamination(userId: ID!, patientId: ID!, examinationType: String!, examinationDate: String!): Patient
    deletePatientHistory(userId: ID!, patientId: ID!, historyType: String!, historyTitle: String!): Patient
    deletePatientAllergies(userId: ID!, patientId: ID!, allergiesType: String!, allergiesTitle: String!): Patient
    deletePatientMedication(userId: ID!, patientId: ID!, medicationType: String!, medicationTitle: String!): Patient
    deletePatientInvestigation(userId: ID!, patientId: ID!, investigationType: String!, investigationTitle: String!): Patient
    deletePatientDiagnosis(userId: ID!, patientId: ID!, diagnosisType: String!, diagnosisTitle: String!): Patient
    deletePatientTreatment(userId: ID!, patientId: ID!, treatmentType: String!, treatmentTitle: String!): Patient
    deletePatientBilling(userId: ID!, patientId: ID!, billingType: String!, billingTitle: String!): Patient
    deletePatientAttachment(userId: ID!, patientId: ID!, attachmentName: String!): Patient
    deletePatientNote(userId: ID!, patientId: ID!, note: String!): Patient
    deletePatientTag(userId: ID!, patientId: ID!, tag: String!): Patient

    createAppointment(userId: ID!, patientId: ID!, appointmentInput: AppointmentInput!): Appointment
    updateAppointment(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentCheckin(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentSeen(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentDischarged(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentNotes(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
    updateAppointmentField(userId: ID!, appointmentId: ID!, field: String!, query: String!): Appointment
    updateAppointmentPatient(userId: ID!, appointmentId: ID!, patientId: ID!): Appointment
    deleteAppointment(userId: ID!, appointmentId: ID!): Appointment

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
