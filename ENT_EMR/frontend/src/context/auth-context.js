import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: {},
    selectedUserId: null,
    patient: {},
    appointment: {},
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
