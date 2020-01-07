import React from 'react';

import PatientExaminationItem from './PatientItem/PatientExaminationItem';
import './UserList.css';

const patientExaminationList = props => {
  console.log("patient examination list props", props.patientExamination);
  const patientExamination = props.patientExamination.map(examination => {
    const patientExaminationDate = new Date(examination.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <PatientExaminationItem
        key={examination.area}
        userId={props.authUserId}
        date={patientExaminationDate}
        general={examination.general}
        area={examination.area}
        type={examination.type}
        measure={examination.measure}
        value={examination.value}
        description={examination.description}
        followUp={examination.followUp}
        attachment={examination.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        examination={examination}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1_detail">{patientExamination}</ul>;
};

export default patientExaminationList;
