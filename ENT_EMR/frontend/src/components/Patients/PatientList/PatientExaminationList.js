import React from 'react';

import PatientExaminationItem from './PatientItem/PatientExaminationItem';
import './UserList.css';

const patientExaminationList = props => {
  console.log("patient examination list props", props.patientExamination);
  const patientExamination = props.patientExamination.map(examination => {
    const patientExaminationDate = new Date(examination.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientExaminationItem
        key={examination.area}
        userId={props.authUserId}
        date={patientExaminationDate}
        type={examination.type}
        measure={examination.measure}
        value={examination.value}
        attachment={examination.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientExamination}</ul>;
};

export default patientExaminationList;
