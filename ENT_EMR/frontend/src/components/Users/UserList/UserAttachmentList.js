import React from 'react';

import UserAttachmentItem from './UserItem/UserAttachmentItem';
import './UserList.css';

const userAttachmentList = props => {
  console.log("user attachment list props", props.userAttachment);
  const userAttachment = props.userAttachment.map(attachment => {
    return (
      <UserAttachmentItem
        key={attachment.name}
        userId={props.authUserId}
        name={attachment.name}
        format={attachment.format}
        path={attachment.path}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        attachment={attachment}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1_detail">{userAttachment}</ul>;
};

export default userAttachmentList;
