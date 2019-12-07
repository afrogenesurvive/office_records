import React from 'react';

import PatientComplaintItem from './PatientItem/PatientComplaintItem';
import './UserList.css';

const patientComplaintList = props => {
  console.log("patient complaintlist props", props.patientComplaint);
  const patientComplaint = props.patientComplaint.map(complaint => {
    const patientComplaintDate = new Date(complaint.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientComplaintItem
        key={complaint.date}
        userId={props.authUserId}
        date={patientComplaintDate}
        title={complaint.title}
        description={complaint.description}
        attachment={complaint.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientComplaint}</ul>;
};

export default patientComplaintList;
