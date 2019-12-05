import React from 'react';

import UserAttendanceItem from './UserItem/UserAttendanceItem';
import './UserList.css';

const userAttendanceList = props => {
  console.log("user attendance list props", props.userAttendance);

  const userAttendance = props.userAttendance.map(attendance => {
    const userAttendanceDate = new Date(attendance.date*1000).toUTCString();

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
