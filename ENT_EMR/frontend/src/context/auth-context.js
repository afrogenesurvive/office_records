import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: null,
    action1: null,
    action2: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
