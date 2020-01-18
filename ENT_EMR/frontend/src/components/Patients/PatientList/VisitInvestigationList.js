import React from 'react';

import VisitInvestigationItem from './PatientItem/VisitInvestigationItem';
import './UserList.css';

const visitInvestigationList = props => {

  let investigation = undefined;
  if (props.investigation) {
  investigation = props.investigation.map(investigationItem => {
    const visitInvestigationDate = new Date(investigationItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const investigationAttachment = investigationItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+investigationItem.attachment.path+"/"+investigationItem.attachment.name+"."+investigationItem.attachment.format;

    return (
      <VisitInvestigationItem
        key={investigationItem.date}
        userId={props.authUserId}
        date={visitInvestigationDate}
        type={investigationItem.type}
        title={investigationItem.title}
        description={investigationItem.description}
        attachment={investigationItem.attachment}
        attachmentName={investigationAttachment.name}
        attachmentFormat={investigationAttachment.format}
        attachmentPath={investigationAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });
}

  return <ul className="user__list1_detail">{investigation}</ul>;
};

export default visitInvestigationList;

// onViewAttachment={props.onViewAttachment}
