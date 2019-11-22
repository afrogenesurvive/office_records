import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: {},
    selectedUser: {},
    selectedPatient: {},
    appointmentPatientId: null,
    selectedAppointment: {},
    patient: {},
    appointment: {},
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
