import React from 'react';

import UserAttachmentItem from './UserItem/UserAttachmentItem';
import './UserList.css';

const userAttachmentList = props => {
  console.log("user attachment list props", props.userAttachment);
  const userAttachment = props.userAttachment.map(attachment => {
    return (
      <UserAttachmentItem
        key={attachment.format}
        userId={props.authUserId}
        name={attachment.name}
        format={attachment.format}
        path={attachment.path}
      />
    );
  });

  return <ul className="user__list1">{userAttachment}</ul>;
};

export default userAttachmentList;
