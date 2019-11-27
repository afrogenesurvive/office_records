import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import SearchUserItem from './UserItem/SearchUserItem';
import './UserList.css';

const searchUserList = props => {
  const searchUsers = props.searchUsers.map(user => {
    return (
      <React.Fragment>
      <Accordion.Toggle as={Button} variant="link" eventKey="3" className="btn" onClick={props.onCancel}>
      x
      </Accordion.Toggle>
      <SearchUserItem
        key={user._id}
        userId={props.authUserId}
        _id={user._id}
        name={user.name}
        email={user.email}
        role={user.role}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });
  return <ul className="user__list">{searchUsers}</ul>;
};

export default searchUserList;
