import React from 'react';

import UserLeaveItem from './UserItem/UserLeaveItem';
import './UserList.css';

const userLeaveList = props => {
  console.log("user leave list props", props.userLeave);
  const userLeave = props.userLeave.map(leave => {
    const userLeaveStartDate = new Date(leave.startDate*1000).toUTCString();
    const userLeaveEndDate = new Date(leave.endDate*1000).toUTCString();
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
