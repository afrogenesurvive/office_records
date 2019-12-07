import React from 'react';

import PatientConsultantItem from './PatientItem/PatientConsultantItem';
import './UserList.css';

const patientConsultantList = props => {
  console.log("patient consultant list props", props.patientConsultant);
  const patientConsultant = props.patientConsultant.map(consultant => {
    const consultantDate = new Date(consultant.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientConsultantItem
        key={consultant.date}
        userId={props.authUserId}
        date={consultantDate}
        reference={consultant.reference}
      />
    );
  });

  return <ul className="user__list1">{patientConsultant}</ul>;
};

export default patientConsultantList;
