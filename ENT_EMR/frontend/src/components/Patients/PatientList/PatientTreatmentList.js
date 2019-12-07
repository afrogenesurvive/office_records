import React from 'react';

import PatientTreatmentItem from './PatientItem/PatientTreatmentItem';
import './UserList.css';

const patientTreatmentList = props => {
  console.log("patient treatment list props", props.patientTreatment);
  const patientTreatment = props.patientTreatment.map(treatment => {
    const patientTreatmentDate = new Date(treatment.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientTreatmentItem
        key={treatment.date}
        userId={props.authUserId}
        date={patientTreatmentDate}
        title={treatment.title}
        description={treatment.description}
        dose={treatment.dose}
        frequency={treatment.frequency}
        type={treatment.type}
        attachment={treatment.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientTreatment}</ul>;
};

export default patientTreatmentList;
