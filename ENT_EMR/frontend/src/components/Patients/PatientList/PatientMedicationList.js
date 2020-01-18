import React from 'react';

import PatientMedicationItem from './PatientItem/PatientMedicationItem';
import './UserList.css';

const patientMedicationList = props => {
  const patientMedication = props.patientMedication.map(medication => {
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+medication.attachment.path+"/"+medication.attachment.name+"."+medication.attachment.format;
    return (
      <PatientMedicationItem
        key={medication.title}
        userId={props.authUserId}
        title={medication.title}
        type={medication.type}
        description={medication.description}
        attachment={medication.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        medication={medication}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientMedication}</ul>;
};

export default patientMedicationList;
