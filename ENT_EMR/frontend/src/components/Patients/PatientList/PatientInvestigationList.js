import React from 'react';

import PatientInvestigationItem from './PatientItem/PatientInvestigationItem';
import './UserList.css';

const patientInvestigationList = props => {
  console.log("patient investigation list props", props.patientInvestigation);
  const patientInvestigation = props.patientInvestigation.map(investigation => {
    const patientInvestigationDate = new Date(investigation.date*1000).toUTCString();
    return (
      <PatientInvestigationItem
        key={investigation.date}
        userId={props.authUserId}
        date={patientInvestigationDate}
        title={investigation.title}
        description={investigation.description}
        attachment={investigation.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientInvestigation}</ul>;
};

export default patientInvestigationList;
