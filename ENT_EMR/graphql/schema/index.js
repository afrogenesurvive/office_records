
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
  address: String
  registrationDate: String
  referralDate: String
  expirationDate: String
  referringDoctor: referringDoctor
  contact: Contact
  appointments: [Appointment]
  occupation: PatientOccupation
  nextOfKin: [NextOfKin]
  insurance: [Insurance]
  complaints: [Complaint]
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
}
type Examination {
  area: String
  type: String
  measure: String
  value: String
  description: String
  attachments: [Attachment]
}
type History {
  type: String
  date: String
  title: String
  description: String
}
type Allergy {
  title: String
  description: String
}
type Medication {
  title: String
  description: String
}
type Investigation {
  date: String
  title: String
  description: String
}
type Diagnosis {
  date: String
  title: String
  description: String
}
type Treatment {
  date: String
  title: String
  description: String
  dose: String
  frequency: String
  type: String
}

type Billing {
  date: String
  title: String
  type: String
  description: String
  amount: Float
  paid: Boolean
  notes: String
}

type Appointment {
  _id: ID!
  title: String
  type: String
  date: String
  location: String
  description: String
  patient: Patient
  inProgress: Boolean
  attended: Boolean
  important: Boolean
  notes: String
}


input UserInput {
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

input PatientInput {
  name: String
  dob: String
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
  insuranceSubscriber: String
  insuranceSubscriberCompany: String
  insuranceSubscriberDescription: String
  complaintDate: String
  complaintTitle: String
  complaintDescription: String
  complaintAttachment: Attachment
  examniationArea: String
  examniationType: String
  examniationMeasure: String
  examniationValue: String
  examniationDescription: String
  examinationAttachment: Attachment
  historyType: String
  historyDate: String
  historyTitle: String
  historyDescription: String
  historyAttachment: Attachment
  allergiesTitle: String
  allergiesDescription: String
  allergiesAttachment: Attachment
  medicationTitle: String
  medicationDescription: String
  medicationAttachment: Attachment
  investigationDate: String
  investigationTitle: String
  investigationDescription: String
  investigationAttachment: Attachment
  diagnosisDate: String
  diagnosisTitle: String
  diagnosisDescription: String
  diagnosisAttachment: Attachment
  treatmentDate: String
  treatmentTitle: String
  treatmentDescription: String
  treatmentDose: String
  treatmentFrequency: String
  treatmentType: String
  treatmentAttachment: Attachment
  billingDate: String
  billingTitle: String
  billingType: String
  billingDescription: String
  billingAmount: Float
  billingPaid: Boolean
  billingAttachment: Attachment
  billingNote: String
  notes: String
  tag: String
  attachment: Attachment
}

input AppointmentInput {
  title: String
  type: String
  date: String
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

    login(email: String!, password: String!): AuthData!

}

type RootMutation {

    createUser(userInput: UserInput!): User
    updateUser(userId: ID!, selectedUserId: ID!, userInput: UserInput!): User
    updateUserField(userId: ID!, selectedUserId: ID!, field: String!, query: String!): User
    deleteUser(userId: ID!, selectedUserId: ID!): User

    createPatient(userId: ID!, patientInput: PatientInput!): Patient
    updatePatient(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientArray(userId: ID!, patientId: ID!, patientInput: PatientInput!): Patient
    updatePatientField(userId: ID!, patientId: ID!, field: String!, query: String!): Patient
    updatePatientFieldArray(userId: ID!, patientId: ID!, field: String!, query: String!): Patient
    updatePatientAppointment(userId: ID!, patientId: ID!, appointmentId: ID!): Patient
    deletePatient(userId: ID!, patientId: ID!): Patient

    createAppointment(userId: ID!, patientId: ID!, appointmentInput: AppointmentInput!): Appointment
    updateAppointment(userId: ID!, appointmentId: ID!, patientId: ID, appointmentInput: AppointmentInput!): Appointment
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
