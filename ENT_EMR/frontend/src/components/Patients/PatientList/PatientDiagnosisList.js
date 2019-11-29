import React from 'react';

import PatientDiagnosisItem from './PatientItem/PatientDiagnosisItem';
import './UserList.css';

const patientDiagnosisList = props => {
  console.log("patient diagnosis list props", props.patientDiagnosis);
  const patientDiagnosis = props.patientDiagnosis.map(diagnosis => {
    return (
      <PatientDiagnosisItem
        key={diagnosis.date}
        userId={props.authUserId}
        date={diagnosis.date}
        title={diagnosis.title}
        description={diagnosis.description}
        attachment={diagnosis.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientDiagnosis}</ul>;
};

export default patientDiagnosisList;
