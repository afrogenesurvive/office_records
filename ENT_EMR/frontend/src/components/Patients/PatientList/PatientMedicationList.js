import React from 'react';

import PatientMedicationItem from './PatientItem/PatientMedicationItem';
import './UserList.css';

const patientMedicationList = props => {
  console.log("patient medication list props", props.patientMedication);
  const patientMedication = props.patientMedication.map(medication => {
    return (
      <PatientMedicationItem
        key={medication.title}
        userId={props.authUserId}
        title={medication.title}
        description={medication.description}
        attachment={medication.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientMedication}</ul>;
};

export default patientMedicationList;
