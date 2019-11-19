import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: {},
    selectedUser: {},
    selectedPatient: {},
    selectedAppointment: {},
    patient: {},
    appointment: {},
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
