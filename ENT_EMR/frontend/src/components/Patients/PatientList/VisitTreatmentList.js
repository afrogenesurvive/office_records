import React from 'react';

import VisitTreatmentItem from './PatientItem/VisitTreatmentItem';
import './UserList.css';

const visitTreatmentList = props => {

  let treatment = undefined;
  if (props.treatment) {
  treatment = props.treatment.map(treatmentItem => {
    const visitTreatmentDate = new Date(treatmentItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const treatmentAttachment = treatmentItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+treatmentItem.attachment.path+"/"+treatmentItem.attachment.name+"."+treatmentItem.attachment.format;
    
    return (
      <VisitTreatmentItem
        key={treatmentItem.date}
        userId={props.authUserId}
        date={visitTreatmentDate}
        type={treatmentItem.type}
        title={treatmentItem.title}
        description={treatmentItem.description}
        dose={treatmentItem.dose}
        frequency={treatmentItem.frequency}
        attachment={treatmentItem.attachment}
        attachmentName={treatmentAttachment.name}
        attachmentFormat={treatmentAttachment.format}
        attachmentPath={treatmentAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });
}

  return <ul className="user__list1_master">{treatment}</ul>;
};

export default visitTreatmentList;

// onViewAttachment={props.onViewAttachment}
