import React from 'react';

import PatientDiagnosisItem from './PatientItem/PatientDiagnosisItem';
import './UserList.css';

const patientDiagnosisList = props => {
  console.log("patient diagnosis list props", props.patientDiagnosis);
  const patientDiagnosis = props.patientDiagnosis.map(diagnosis => {
    const patientDiagnosisDate = new Date(diagnosis.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+diagnosis.attachment.path+"/"+diagnosis.attachment.name+"."+diagnosis.attachment.format;
    return (
      <PatientDiagnosisItem
        key={diagnosis.date}
        userId={props.authUserId}
        date={patientDiagnosisDate}
        title={diagnosis.title}
        type={diagnosis.type}
        description={diagnosis.description}
        attachment={diagnosis.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        diagnosis={diagnosis}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientDiagnosis}</ul>;
};

export default patientDiagnosisList;
