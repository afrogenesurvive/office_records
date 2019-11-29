import React from 'react';

import PatientTreatmentItem from './PatientItem/PatientTreatmentItem';
import './UserList.css';

const patientTreatmentList = props => {
  console.log("patient treatment list props", props.patientTreatment);
  const patientTreatment = props.patientTreatment.map(treatment => {
    return (
      <PatientTreatmentItem
        key={treatment.date}
        userId={props.authUserId}
        date={treatment.date}
        title={treatment.title}
        description={treatment.description}
        dose={treatment.dose}
        frequency={treatment.frequency}
        type={treatment.type}
        attachment={treatment.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientTreatment}</ul>;
};

export default patientTreatmentList;
