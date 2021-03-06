const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { pocketVariables } = require('../../helpers/pocketVars');
const { creds } = require('../../helpers/this');

module.exports = {
  login: async ({ email, password }) => {

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');

    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id },'MsBarbri',{expiresIn: '2h'});

    pocketVariables.token = token;
    pocketVariables.userId = user.id;

    return { userId: user.id, token: token, tokenExpiration: 2 };
  },
  getCreds: async (req) => {

    if (pocketVariables.isAuth !== true) {
      throw new Error('Unauthenticated!');

    }
      return {
        atlas: creds.atlas,
        s3: creds.s3,
        jwt: creds.jwt,
        gdrive: creds.gdrive
      };
  }
};
