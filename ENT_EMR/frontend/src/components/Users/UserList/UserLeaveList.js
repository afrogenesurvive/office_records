import React from 'react';
import moment from 'moment';


import UserLeaveItem from './UserItem/UserLeaveItem';
import './UserList.css';

const userLeaveList = props => {
  console.log("user leave list props", props.userLeave);
  const userLeave = props.userLeave.map(leave => {
    const userLeaveStartDate = new Date (leave.startDate.substr(0,10)*1000).toISOString().slice(0,10);
    const userLeaveEndDate = new Date (leave.endDate.substr(0,10)*1000).toISOString().slice(0,10);
    // const userAttendanceDate = new Date (attendance.date.substr(0,10)*1000).toUTCString();
    return (
      <UserLeaveItem
        key={leave.type}
        userId={props.authUserId}
        type={leave.type}
        startDate={userLeaveStartDate}
        endDate={userLeaveEndDate}
        description={leave.description}
      />
    );
  });

  return <ul className="user__list1">{userLeave}</ul>;
};

export default userLeaveList;
