import React from 'react';

import VisitComplaintItem from './PatientItem/VisitComplaintItem';
import './UserList.css';

const visitComplaintList = props => {
  console.log("VisitComplaintlist props", props.complaint);

  let complaint = undefined;
  if (props.complaint) {
  complaint = props.complaint.map(complaintItem => {
    const visitComplaintDate = new Date(complaintItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const complaintAttachment = complaintItem.attachment;
    console.log(`
      visitComplaintDate: ${visitComplaintDate},
      `);
    return (
      <VisitComplaintItem
        key={complaintItem.date}
        userId={props.authUserId}
        date={visitComplaintDate}
        title={complaintItem.title}
        description={complaintItem.description}
        anamnesis={complaintItem.anamnesis}
        attachment={complaintItem.attachment}
        attachmentName={complaintAttachment.name}
        attachmentFormat={complaintAttachment.format}
        attachmentPath={complaintAttachment.path}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1">{complaint}</ul>;
};
}

export default visitComplaintList;

// onViewAttachment={props.onViewAttachment}
