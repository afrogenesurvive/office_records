import React from 'react';

import PatientTreatmentItem from './PatientItem/PatientTreatmentItem';
import './UserList.css';

const patientTreatmentList = props => {
  console.log("patient treatment list props", props.patientTreatment);
  const patientTreatment = props.patientTreatment.map(treatment => {
    const patientTreatmentDate = new Date(treatment.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <PatientTreatmentItem
        key={treatment.date}
        userId={props.authUserId}
        date={patientTreatmentDate}
        title={treatment.title}
        type={treatment.type}
        description={treatment.description}
        dose={treatment.dose}
        frequency={treatment.frequency}
        type={treatment.type}
        attachment={treatment.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        treatment={treatment}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1">{patientTreatment}</ul>;
};

export default patientTreatmentList;
