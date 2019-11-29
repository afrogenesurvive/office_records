import React from 'react';

import PatientExaminationItem from './PatientItem/PatientExaminationItem';
import './UserList.css';

const patientExaminationList = props => {
  console.log("patient examination list props", props.patientExamination);
  const patientExamination = props.patientExamination.map(examination => {
    return (
      <PatientExaminationItem
        key={examination.area}
        userId={props.authUserId}
        area={examination.area}
        type={examination.type}
        measure={examination.measure}
        value={examination.value}
        attachment={examination.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientExamination}</ul>;
};

export default patientExaminationList;
