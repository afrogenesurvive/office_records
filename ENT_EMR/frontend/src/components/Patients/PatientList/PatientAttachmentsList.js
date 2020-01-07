import React from 'react';

import PatientAttachmentItem from './PatientItem/PatientAttachmentItem';
import './UserList.css';

const patientAttachmentsList = props => {
  console.log("patient attachments list props", props.patientAttachments);
  const patientAttachments = props.patientAttachments.map(attachment => {

    return (
      <PatientAttachmentItem
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

  return <ul className="user__list1_detail">{patientAttachments}</ul>;
};

export default patientAttachmentsList;
