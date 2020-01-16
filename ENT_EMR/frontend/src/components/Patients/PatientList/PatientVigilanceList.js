import React from 'react';

import PatientVigilanceItem from './PatientItem/PatientVigilanceItem';
import './UserList.css';

const patientVigilanceList = props => {
  console.log("patient vigilance list props", props.patientVigilance);
  const patientVigilance = props.patientVigilance.map(vigilance => {
    const patientVigilanceDate = new Date(vigilance.date.substr(0,10)*1000).toISOString().slice(0,10);

    return (
      <PatientVigilanceItem
        key={vigilance.date}
        userId={props.authUserId}
        date={patientVigilanceDate}
        chronicIllness={vigilance.chronicIllness}
        lifestyle={vigilance.lifestyle}
        screening={vigilance.screening}
        vaccines={vigilance.vaccines}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        vigilance={vigilance}
      />
    );
  });

  return <ul className="user__list1_detail">{patientVigilance}</ul>;
};

export default patientVigilanceList;
