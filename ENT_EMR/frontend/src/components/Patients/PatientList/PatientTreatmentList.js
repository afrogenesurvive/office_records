import React from 'react';

import PatientTreatmentItem from './PatientItem/PatientTreatmentItem';
import './UserList.css';

const patientTreatmentList = props => {
  console.log("patient treatment list props", props.patientTreatment);
  const patientTreatment = props.patientTreatment.map(treatment => {
    const patientTreatmentDate = new Date(treatment.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+treatment.attachment.path+"/"+treatment.attachment.name+"."+treatment.attachment.format;
    return (
      <PatientTreatmentItem
        key={treatment.title}
        userId={props.authUserId}
        date={patientTreatmentDate}
        title={treatment.title}
        type={treatment.type}
        description={treatment.description}
        dose={treatment.dose}
        frequency={treatment.frequency}
        attachment={treatment.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        treatment={treatment}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientTreatment}</ul>;
};

export default patientTreatmentList;
