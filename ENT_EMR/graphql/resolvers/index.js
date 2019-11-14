const authResolver = require('./auth');
const userResolver = require('./user');
const patientResolver = require('./patient');
// const appointmentResolver = require('./appointment');


const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...patientResolver,
  // ...appointmentResolver
};

module.exports = rootResolver;
