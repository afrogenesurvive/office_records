import React from 'react';

import VisitDiagnosisItem from './PatientItem/VisitDiagnosisItem';
import './UserList.css';

const visitDiagnosisList = props => {
  console.log("VisitDiagnosislist props", props.diagnosis);

  let diagnosis = undefined;
  if (props.diagnosis) {
  diagnosis = props.diagnosis.map(diagnosisItem => {
    const visitDiagnosisDate = new Date(diagnosisItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const diagnosisAttachment = diagnosisItem.attachment;
    console.log(`
      visitDiagnosisDate: ${visitDiagnosisDate},
      `);
    return (
      <VisitDiagnosisItem
        key={diagnosisItem.date}
        userId={props.authUserId}
        date={visitDiagnosisDate}
        type={diagnosisItem.type}
        title={diagnosisItem.title}
        description={diagnosisItem.description}
        attachment={diagnosisItem.attachment}
        attachmentName={diagnosisAttachment.name}
        attachmentFormat={diagnosisAttachment.format}
        attachmentPath={diagnosisAttachment.path}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1">{diagnosis}</ul>;
};
}
export default visitDiagnosisList;

// onViewAttachment={props.onViewAttachment}
