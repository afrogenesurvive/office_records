import React from 'react';

import UserAttendanceItem from './UserItem/UserAttendanceItem';
import './UserList.css';

const userAttendanceList = props => {
  console.log("user attendance list props", props.userAttendance);

  const userAttendance = props.userAttendance.map(attendance => {
    let userAttendanceDate = attendance.date;
    if (userAttendanceDate !== null) {
      userAttendanceDate = new Date (attendance.date.substr(0,10)*1000).toISOString().slice(0,10);
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
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        attendance={attendance}
      />
    );
  });

  return <ul className="user__list1_detail">{userAttendance}</ul>;
};

export default userAttendanceList;
