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

const multer  = require('multer');
const upload = multer({ dest: './uploads/' });


module.exports = {
  users: async (args, req) => {
    console.log(`
      users...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({});
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  usersNameAsc: async (args, req) => {
    console.log(`
      users...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');

    }
    try {
      const users = await User.find({}).sort({ name: 1 });
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  usersNameDesc: async (args, req) => {
    console.log(`
      users...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');

    }
    try {
      const users = await User.find({}).sort({ name: -1 });
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisUser: async (args, req) => {
    console.log(`
      getThisUser...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(req.userId);
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {
    console.log(`
      getUserId...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById(args.selectedUserId);
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
    console.log(`
      getUserField...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      console.log(`
        resolverField: ${resolverField},
        resolverQuery: ${resolverQuery},
        queryObject: ${query},
        `);
      const users = await User.find(query);
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserAttendanceDate: async (args, req) => {
    console.log(`
      getUserAttendanceDate...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const attendanceDate = new Date(args.attendanceDate);
      console.log(`
        attendanceDate: ${attendanceDate},
        `);
      const users = await User.find({'attendance.date': attendanceDate, 'attendance.status': ''});
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserLeaveDateRange: async (args, req) => {
    console.log(`
      getUserLeaveDateRange...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const startDate = new Date(args.startDate).toISOString();
      const endDate = new Date(args.endDate).toISOString();
      console.log(`
        startDate: ${startDate},
        endDate: ${endDate},
        `);
      const users = await User.find({'leave.startDate': {'$gt' : new Date(startDate) , '$lt': new Date(endDate) }, 'leave.endDate': {'$gt' : new Date(startDate) , '$lt': new Date(endDate) }});
      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, req) => {
    console.log(`
      updateUser...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        dob: args.userInput.dob,
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice,
        },
        phone: args.userInput.phone,
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        },{new: true});
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserField: async (args, req) => {
    console.log(`
      updateUserField...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
      console.log(`
          resolverField: ${resolverField},
          resolverQuery: ${resolverQuery},
          query object: ${JSON.stringify(query)},
        `);
      const user = await User.findOneAndUpdate({_id:args.selectedUserId},query,{new: true})
      return {
        ...user._doc,
        _id: user.id,
        email: user.email,
        name: user.name,
        dob: user.dob,
        address: user.address,
        phone: user.phone,
        role: user.role,
        employmentDate: user.employmentDate,
        terminationDate: user.terminationDate,
        attachments: user.attachments,
        attendance: user.attendance,
        leave: user.leave,
      };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserAttachment: async (args, req) => {
    console.log(`
      updateUserAttachment...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        dob: user.dob,
        address: user.address,
        phone: user.phone,
        role: user.role,
        employmentDate: user.employmentDate,
        terminationDate: user.terminationDate,
        attachments: user.attachments,
        attendance: user.attendance,
        leave: user.leave,
      };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserAttendance: async (args, req) => {
    console.log(`
      updateUserAttendance...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserAttendanceToday: async (args, req) => {
    console.log(`
      updateUserAttendanceToday...args:
      ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {
      const today = new Date();
      const status = "Present";
      const userAttendanceObject = {
        date: today,
        status: status,
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
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  updateUserLeave: async (args, req) => {
    console.log(`
      updateUserLeave...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        title: args.userInput.leaveTitle,
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
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUserLeave: async (args, req) => {
    console.log(`
      deleteUserLeave...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {
      const title = args.leaveTitle;
      console.log(`
          title: ${title}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { leave: { title: title }}},{new: true})
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUserAttendance: async (args, req) => {
    console.log(`
      deleteUserAttendance...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {
      const attendanceDate = args.attendanceDate;
      // const attendanceDate = new Date(args.attendanceDate).toISOString();
      console.log(`
          attendanceDate: ${attendanceDate}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { attendance: { date: attendanceDate }}},{new: true})
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUserAttachment: async (args, req) => {
    console.log(`
      deleteUserAttachment...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      // if (args.selectedUserId != args.userId ) {
      //   throw new Error('Not the creator! No edit permission');
      // }
      // else {
      const attachmentName = args.attachmentName;
      console.log(`
          attachmentName: ${attachmentName}
        `);

        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { attachments: { name: attachmentName }}},{new: true})
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {
    console.log(`
      deleteUser...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
      // }
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args, req) => {
    console.log(`
      createUser...args: ${util.inspect(args)},
      isAuth: ${req.isAuth},
      `);

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
        dob: args.userInput.dob,
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice,
        },
        phone: args.userInput.phone,
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        attachments: [{
              name: "",
              format: "",
              path: "",
            }],
        attendance: [{
            date: 0,
            status: "",
            description: "",
          }],
        leave: [{
            type: "",
            title: "",
            startDate: 0,
            endDate: 0,
          }],
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        dob: result.dob,
        address: result.address,
        phone: result.phone,
        role: result.role,
        employmentDate: result.employmentDate,
        terminationDate: result.terminationDate,
        attachments: result.attachments,
        attendance: result.attendance,
        leave: result.leave,
      };
    } catch (err) {
      throw err;
    }
  }
};
