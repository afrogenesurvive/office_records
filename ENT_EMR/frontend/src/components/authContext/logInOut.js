// import React, {Component} from 'react';

import AuthData from "components/authContext/authContext.js";
const authData = AuthData;
console.log(authData);

 const logInOut = {

   login: (token, userId, tokenExpiration) => {
       this.setState({ token: token, userId: userId });
     },

     logout: () => {
       this.setState({ token: null, userId: null });
       sessionStorage.clear();
     }
}

module.exports = logInOut;
