import React from 'react';

import PatientConsultantItem from './PatientItem/PatientConsultantItem';
import './UserList.css';

const patientConsultantList = props => {
  console.log("patient consultant list props", props.patientConsultant);
  const patientConsultant = props.patientConsultant.map(consultant => {
    // const patientConsultantExpiry = new Date(insurance.expiry*1000).toUTCString();
    return (
      <PatientConsultantItem
        key={consultant.date}
        userId={props.authUserId}
        consultant={consultant}
      />
    );
  });

  return <ul className="userAttendanceList">{patientConsultant}</ul>;
};

export default patientConsultantList;
