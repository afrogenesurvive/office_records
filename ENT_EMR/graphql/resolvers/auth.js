const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  login: async ({ email, password }) => {

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');

      // FIX ME!!!
      // can gql  quers/mutes return A || B? if so define type Error in schema and send from resolvers, recieve on frontend n pass to component state.userAlert
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id },'MsBarbri',{expiresIn: '2h'});

    pocketVariables.token = token;
    pocketVariables.userId = user.id;

    return { userId: user.id, token: token, tokenExpiration: 2 };
  }
};
