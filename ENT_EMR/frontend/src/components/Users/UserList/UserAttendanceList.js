import React from 'react';
import moment from 'moment';

import UserAttendanceItem from './UserItem/UserAttendanceItem';
import './UserList.css';

const userAttendanceList = props => {
  console.log("user attendance list props", props.userAttendance);

  const userAttendance = props.userAttendance.map(attendance => {
    let userAttendanceDate = attendance.date;
    if (userAttendanceDate !== null) {
      userAttendanceDate = new Date (attendance.date.substr(0,10)*1000).toLocaleString();
      console.log("userAttendanceDate", userAttendanceDate);
    }

    // const userAttendanceDate = new Date (attendance.date.substr(0,10)*1000).toLocaleString();
    // const userAttendanceDate = new Date (attendance.date.substr(0,10)*1000).toUTCString();
    // console.log("userAttendanceDate", userAttendanceDate);

    return (
      <UserAttendanceItem
        key={attendance.date}
        userId={props.authUserId}
        date={userAttendanceDate}
        status={attendance.status}
        description={attendance.description}
      />
    );
  });

  return <ul className="user__list1">{userAttendance}</ul>;
};

export default userAttendanceList;
