const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');


const User = require('../../models/user');
const Patient = require('../../models/patient');
const Appointment = require('../../models/appointment');
// const util = require('util');

const { transformPatient } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  patients: async (args, req) => {
    // console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const users = await User.find()
      .populate('appointments');

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    // console.log("args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {
      const user = await User.findById(args.otherUserId)
      .populate('appointments');

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

    try {
      const user = await User.findOne({username: args.username})
      .populate('appointments');

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
      },{new: true})
      .populate('appointments');

        return {
            ...user._doc,
            _id: user.id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            address: user.address
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserAction: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

        const userAction = await Action.findById({_id:args.ActionId});
        const userActionId = userAction.id
        console.log("userAction... " + userAction.target);
        console.log("userActionId... " + userActionId);

        const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: {actions:userAction}},{new: true})
        .populate('appointments')

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

      const user = await User.findByIdAndRemove(args.userId)
      .populate('appointments');

        return {
            ...user._doc,
            _id: user.id,
            username: user.username
        };
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        dob: new Date(args.userInput.dob),
        username: args.userInput.username,
        description: args.userInput.description,
        avatar: args.userInput.avatar,
        phone: args.userInput.phone,
        address: args.userInput.address,
        socialMedia: args.userInput.socialMedia,
        demographics: args.userInput.demographics,
        biographics: args.userInput.biographics,
        psychgraphics: args.userInput.psychgraphics,
        consumption: args.userInput.consumption,
        actions: args.userInput.actions,
        content: args.userInput.content,
        groups: args.userInput.groups,
        searches: args.userInput.searches,
        perks: args.userInput.perks
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        dob: result.dob,
        username: result.username,
        description: result.description,
        avatar: result.avatar,
        phone: result.phone,
        address: result.address,
        socialMedia: result.socialMedia
      };
    } catch (err) {
      throw err;
    }
  },
};
