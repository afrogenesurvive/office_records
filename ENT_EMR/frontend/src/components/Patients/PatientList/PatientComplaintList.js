import React from 'react';

import PatientComplaintItem from './PatientItem/PatientComplaintItem';
import './UserList.css';

const patientComplaintList = props => {
  console.log("patient complaintlist props", props.patientComplaint);
  const patientComplaint = props.patientComplaint.map(complaint => {
    return (
      <PatientComplaintItem
        key={complaint.date}
        userId={props.authUserId}
        date={complaint.date}
        title={complaint.title}
        description={complaint.description}
        attachment={complaint.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientComplaint}</ul>;
};

export default patientComplaintList;
