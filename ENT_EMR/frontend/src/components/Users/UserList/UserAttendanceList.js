import React from 'react';

import UserAttendanceItem from './UserItem/UserAttendanceItem';
import './UserList.css';

const userAttendanceList = props => {
  console.log("user attendance list props", props.userAttendance);
  const userAttendance = props.userAttendance.map(attendance => {
    return (
      <UserAttendanceItem
        key={attendance.date}
        userId={props.authUserId}
        status={attendance.status}
        description={attendance.description}
      />
    );
  });

  return <ul className="userAttendanceList">{userAttendance}</ul>;
};

export default userAttendanceList;
