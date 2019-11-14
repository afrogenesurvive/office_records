const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');


const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
const util = require('util');

const { transformUser } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  users: async (args, req) => {
    // console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));

    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated!');
    // }

    try {
      const users = await User.find();
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(pocketVariables.userId);
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            email: user.email
        };
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(args.otherUserId);
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  getUserField: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const resolverField = args.field;
    const resolverQuery = args.query;

    try {
      const user = await User.find({resolverField: resolverQuery});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const owner = await User.findById({_id:args.userId});
      console.log("request user... " + pocketVariables.userId);
      console.log("owner... " + owner._id)
      if (owner._id != pocketVariables.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      else {

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = await User.findOneAndUpdate({_id:args.userId},{
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        dob: new Date(args.userInput.dob),
        username: args.userInput.username,
        description: args.userInput.description,
        avatar: args.userInput.avatar,
        phone: args.userInput.phone,
        address: args.userInput.address
      },{new: true});
        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            address: user.address
        };
      }
    } catch (err) {
      throw err;
    }
  },
  updateUserField: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

        const userAction = await Action.findById({_id:args.ActionId});
        const userActionId = userAction.id
        console.log("userAction... " + userAction.target);
        console.log("userActionId... " + userActionId);

        const resolverField = args.field;
        const resolverQuery = args.query;

        const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {resolverField:resolverQuery}},{new: true})

        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            actions: user.actions
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const owner = await User.findById({_id:args.userId});
      console.log("request user... " + pocketVariables.userId);
      console.log("owner... " + owner._id)
      if (owner._id != pocketVariables.userId ) {
        throw new Error('Not the creator! No edit permission');
      }
      else {

      const user = await User.findByIdAndRemove(args.userId);
        return {
            ...user._doc,
            _id: user.id,
            username: user.username
        };
      }
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args, req) => {
    console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object...", util.inspect(req));
    // console.log(JSON.stringify(req));
    try {
      const existingUserName = await User.findOne({ name: args.userInput.name});

      if (existingUserName) {
        throw new Error('User w/ that name exists already.');
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        role: args.userInput.role
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        role: result.role
      };
    } catch (err) {
      throw err;
    }
  }
};
