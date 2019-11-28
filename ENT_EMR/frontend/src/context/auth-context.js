import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: {},
    users:[],
    selectedUser: {},
    selectedPatient: {},
    selectedAppointment: {},
    patient: {},
    appointment: {},
    appointmentPatientId: null,
    userUpdateField: null,
    patientUpdateField: null,
    appointmentUpdateField: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
