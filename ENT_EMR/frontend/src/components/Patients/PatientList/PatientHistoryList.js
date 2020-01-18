import React from 'react';

import PatientHistoryItem from './PatientItem/PatientHistoryItem';
import './UserList.css';

const patientHistoryList = props => {
  const patientHistory = props.patientHistory.map(history => {
    const patientHistoryDate = new Date(history.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+history.attachment.path+"/"+history.attachment.name+"."+history.attachment.format;
    return (
      <PatientHistoryItem
        key={history.date}
        userId={props.authUserId}
        type={history.type}
        date={patientHistoryDate}
        title={history.title}
        description={history.description}
        attachment={history.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        history={history}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientHistory}</ul>;
};

export default patientHistoryList;
