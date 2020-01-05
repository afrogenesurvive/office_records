import React from 'react';

import VisitTreatmentItem from './PatientItem/VisitTreatmentItem';
import './UserList.css';

const visitTreatmentList = props => {
  console.log("VisitTreatmentlist props", props.treatment);
  let treatment = undefined;
  if (props.treatment) {
  treatment = props.treatment.map(treatmentItem => {
    const visitTreatmentDate = new Date(treatmentItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const treatmentAttachment = treatmentItem.attachment;
    console.log(`
      visitTreatmentDate: ${visitTreatmentDate},
      `);
    return (
      <VisitTreatmentItem
        key={treatmentItem.date}
        userId={props.authUserId}
        date={visitTreatmentDate}
        type={treatmentItem.type}
        title={treatmentItem.title}
        type={treatmentItem.type}
        description={treatmentItem.description}
        dose={treatmentItem.dose}
        frequency={treatmentItem.frequency}
        attachment={treatmentItem.attachment}
        attachmentName={treatmentAttachment.name}
        attachmentFormat={treatmentAttachment.format}
        attachmentPath={treatmentAttachment.path}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });
}

  return <ul className="user__list1">{treatment}</ul>;
};

export default visitTreatmentList;

// onViewAttachment={props.onViewAttachment}
