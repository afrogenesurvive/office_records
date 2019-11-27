import React from 'react';

import UserLeaveItem from './UserItem/UserLeaveItem';
import './UserList.css';

const userLeaveList = props => {
  console.log("user leave list props", props.userLeave);
  const userLeave = props.userLeave.map(leave => {
    return (
      <UserLeaveItem
        key={leave.type}
        userId={props.authUserId}
        type={leave.type}
        startDate={leave.startDate}
        endDate={leave.endDate}
        description={leave.description}
      />
    );
  });

  return <ul className="userLeaveList">{userLeave}</ul>;
};

export default userLeaveList;
