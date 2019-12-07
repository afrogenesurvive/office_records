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
    // console.log("users...args..." + util.inspect(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + JSON.stringify(req));
    console.log("users...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    try {

      const users = await User.find();
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("getThisUser...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(pocketVariables.userId);
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("getUserId...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(args.otherUserId);
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
    } catch (err) {
      throw err;
    }
  },
  getUserField: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("getUserField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const resolverField = args.field;
    const resolverQuery = args.query;
    const query = {[resolverField]:resolverQuery};

    console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

    try {
      const users = await User.find(query);
      return users.map(user => {
        return transformUser(user);
        // ...user._doc,
        // _id: user.id,
        // email: user.email,
        // name: user.name,
        // role: user.role
      });
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("updateUser...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {


      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = await User.findOneAndUpdate({_id:args.selectedUserId},{
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        // attachment: {
        //     name: args.userInput.attachmentName,
        //     format: args.userInput.attachmentFormat,
        //     path: args.userInput.attachmentPath,
        // },
        // $addToSet:
        //   {
        //     attendance: {
        //       date: args.userInput.attendanceDate,
        //       status: args.userInput.attendanceStatus,
        //       description: args.userInput.attendanceDescription
        //     },
        //     leave: {
        //       type: args.userInput.leaveType,
        //       startDate: args.userInput.leaveStartDate,
        //       endDate: args.userInput.leaveEndDate
        //     }
        //   }

      },{new: true});
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachment: user.attachment,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserField: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("updateUserField...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};

      console.log("resolverField:  ", resolverField, "resolverQuery:  ", resolverQuery, "query object:  ", query);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},query,{new: true})

        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            employmentDate: user.employmentDate,
            terminationDate: user.terminationDate,
            attachment: user.attachment,
            attendance: user.attendance,
            leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserAttachment: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("updateUserAttachment...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const userAttachmentObject = {
        name: args.userInput.attachmentName,
        format: args.userInput.attachmentFormat,
        path: args.userInput.attachmentPath
      }
      console.log(`
        userAttachmentObject: ${userAttachmentObject}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$addToSet: { attachments: userAttachmentObject}},{new: true})

        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            employmentDate: user.employmentDate,
            terminationDate: user.terminationDate,
            attachment: user.attachment,
            attendance: user.attendance,
            leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserAttendance: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("updateUserAttendance...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const userAttendanceObject = {
        date: args.userInput.attendanceDate,
        status: args.userInput.attendanceStatus,
        description: args.userInput.attendanceDescription,
      }
      console.log(`
        userAttendanceObject: ${util.inspect(userAttendanceObject)}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$addToSet: { attendance: userAttendanceObject}},{new: true, useFindAndModify: false})

        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            name: user.name,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserLeave: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("updateUserLeave...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const userLeaveObject = {
        type: args.userInput.leaveType,
        startDate: args.userInput.leaveStartDate,
        endDate: args.userInput.leaveEndDate,
      }
      console.log(`
        userLeaveObject: ${JSON.stringify(userLeaveObject)}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$addToSet: { leave: userLeaveObject}},{new: true})

        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            employmentDate: user.employmentDate,
            terminationDate: user.terminationDate,
            attachment: user.attachment,
            attendance: user.attendance,
            leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUserLeave: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("deleteUserLeave...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const startDate = dateToString(args.startDate);
      const endDate = dateToString(args.endDate);
      console.log(`
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { leave: { title: args.leaveTitle}}},{new: true})
        // user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { leave: { type: "test3"}}},{new: true})

        return {
            ...user._doc,
            _id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            employmentDate: user.employmentDate,
            terminationDate: user.terminationDate,
            attachment: user.attachment,
            attendance: user.attendance,
            leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object..." + util.inspect(req));
    console.log("deleteUser...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      // if (args.selectedUserId != args.userId) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {

      const user = await User.findByIdAndRemove(args.selectedUserId);
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachment: user.attachment,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args, req) => {
    // console.log("args..." + JSON.stringify(args), "pocketVariables..." + JSON.stringify(pocketVariables), "req object...", util.inspect(req));
    console.log("createUser...args:  " + util.inspect(args), "pocketVariables:  " + JSON.stringify(pocketVariables), "isAuth:  " + req.isAuth);
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
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        attachments: [
          {
              name: "",
              format: "",
              path: "",
            }
        ],
        attendance: [
          {
            date: 0,
            status: "",
            description: "",
          }
        ],
        leave: [
          {
            type: "",
            startDate: 0,
            endDate: 0,
          }
        ],
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        role: result.role,
        employmentDate: result.employmentDate,
        terminationDate: result.terminationDate,
      };
    } catch (err) {
      throw err;
    }
  }
};
