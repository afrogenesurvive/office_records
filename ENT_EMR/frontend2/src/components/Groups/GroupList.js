import React from 'react';

import GroupItem from './GroupItem/GroupItem';
import './GroupList.css';

const groupList = props => {
  const groups = props.users.map(group => {
    return (
      <GroupItem
        key={user._id}
        userId={props.authUserId}
        _id={user._id}
        name={user.name}
        username={user.username}
        email={user.email}
        dob={user.dob}
        description={user.description}
        avatar={user.avatar}
        address={user.address}
        phone={user.phone}
        socialMedia={user.socialMedia}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="group__list">{groups}</ul>;
};

export default groupList;
