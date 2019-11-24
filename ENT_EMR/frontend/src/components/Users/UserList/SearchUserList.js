import React from 'react';

import SearchUserItem from './UserItem/SearchUserItem';
import './UserList.css';

const searchUserList = props => {
  const searchUsers = props.searchUsers.map(user => {
    return (
      <SearchUserItem
        key={user._id}
        userId={props.authUserId}
        _id={user._id}
        name={user.name}
        email={user.email}
        role={user.role}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list">{searchUsers}</ul>;
};

export default searchUserList;
