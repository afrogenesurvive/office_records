import React from 'react';

import VisitDiagnosisItem from './PatientItem/VisitDiagnosisItem';
import './UserList.css';

const visitDiagnosisList = props => {

  let diagnosis = undefined;
  if (props.diagnosis) {
  diagnosis = props.diagnosis.map(diagnosisItem => {
    const visitDiagnosisDate = new Date(diagnosisItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const diagnosisAttachment = diagnosisItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+diagnosisItem.attachment.path+"/"+diagnosisItem.attachment.name+"."+diagnosisItem.attachment.format;

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
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{diagnosis}</ul>;
};
}
export default visitDiagnosisList;

// onViewAttachment={props.onViewAttachment}
