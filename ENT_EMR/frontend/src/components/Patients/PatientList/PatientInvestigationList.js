import React from 'react';

import PatientInvestigationItem from './PatientItem/PatientInvestigationItem';
import './UserList.css';

const patientInvestigationList = props => {
  const patientInvestigation = props.patientInvestigation.map(investigation => {
    const patientInvestigationDate = new Date(investigation.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+investigation.attachment.path+"/"+investigation.attachment.name+"."+investigation.attachment.format;
    return (
      <PatientInvestigationItem
        key={investigation.date}
        userId={props.authUserId}
        date={patientInvestigationDate}
        title={investigation.title}
        type={investigation.type}
        description={investigation.description}
        attachment={investigation.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        investigation={investigation}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientInvestigation}</ul>;
};

export default patientInvestigationList;
