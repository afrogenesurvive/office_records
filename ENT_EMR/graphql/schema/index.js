
const { GraphQLObjectType, GraphQLString } = require('graphql')
const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  email: String
  password: String
  name: String
  role: String
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
  referringDoctor: referringDoctor
  contact: PatientContact
  appointments: [Appointment]
  occupation: PatientOccupation
  nextOfKin: String
  insurance: String
  complaint: [String]
  history: [String]
  allergies: [String]
  medication: [String]
  investigation: [String]
  diagnosis: [String]
  management: [String]
  billing: Billing
  notes: [String]
  tags: [String]
}

type referringDoctor {
  name: String
  email: String
  phone: String
}
type PatientContact {
  email: String
  phone: String
}
type PatientOccupation {
  role: String
  employer: String
  contact: PatientOccupationContact
}
type PatientOccupationContact {
  email: String
  phone: String
}
type Billing {
  date: String
  title: String
  type: String
  description: String
  amount: Float
  paid: Boolean
  notes: [String]
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
  notes: [String]
}


input UserInput {
  email: String
  password: String
  name: String
  role: String
}

input PatientInput {
  name: String
  dob: String
  address: String
  contactPhone: String
  contactEmail: String
  registrationDate: String
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
  historyType: String
  historyDate: String
  historyTitle: String
  historyDescription: String
  allergiesTitle: String
  allergiesDescription: String
  medicationTitle: String
  medicationDescription: String
  investigationDate: String
  investigationTitle: String
  investigationDescription: String
  diagnosisDate: String
  diagnosisTitle: String
  diagnosisDescription: String
  treatmentDate: String
  treatmentTitle: String
  treatmentDescription: String
  treatmentDose: String
  treatmentFrequency: String
  treatmentType: String
  billingDate: String
  billingTitle: String
  billingType: String
  billingDescription: String
  billingAmount: Float
  billingPaid: Boolean
  billingNote: String
  note: String
  tag: String
}

input AppointmentInput {
  title: String
  type: String
  date: String
  location: String
  description: String
  patient: String
  inProgress: Boolean
  note: String
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
