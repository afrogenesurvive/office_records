const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { pocketVariables } = require('../../helpers/pocketVars');

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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    pocketVariables.token = token;
    pocketVariables.userId = user.id;

    return { userId: user.id, token: token, tokenExpiration: 2 };
  },
  getCreds: async (req) => {

    if (pocketVariables.isAuth !== true) {
      throw new Error('Unauthenticated!');

    }
      return {
        atlas: {
          user: process.env.ATLAS_USER,
          pw: process.env.ATLAS_PW,
          db: process.env.ATLAS_DB
        },
        s3: {
          bucketName: process.env.S3_BUCKET_NAME,
          region: process.env.S3_REGION,
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        },
        jwt: {
          encode: process.env.JWT_SECRET
        },
        gdrive: {
          clientId: process.env.GDRIVE_CLIENT_ID,
          developerKey: process.env.GDRIVE_DEVELOPER_KEY
        }
      };
  }
};
