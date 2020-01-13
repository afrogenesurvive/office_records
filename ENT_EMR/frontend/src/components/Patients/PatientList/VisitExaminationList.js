import React from 'react';

import VisitExaminationItem from './PatientItem/VisitExaminationItem';
import './UserList.css';

const visitExaminationList = props => {
  console.log("VisitExaminationlist props", props.examination);

  let examination = undefined;
  if (props.examination) {
  examination = props.examination.map(examinationItem => {
    const visitExaminationDate = new Date(examinationItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const examinationAttachment = examinationItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+examinationItem.attachment.path+"/"+examinationItem.attachment.name+"."+examinationItem.attachment.format;
    console.log(`
      visitExaminationDate: ${visitExaminationDate},
      `);
    return (
      <VisitExaminationItem
        key={examinationItem.date}
        userId={props.authUserId}
        date={visitExaminationDate}
        general={examinationItem.general}
        area={examinationItem.area}
        type={examinationItem.type}
        measure={examinationItem.measure}
        value={examinationItem.value}
        description={examinationItem.description}
        followUp={examinationItem.followUp}
        attachment={examinationItem.attachment}
        attachmentName={examinationAttachment.name}
        attachmentFormat={examinationAttachment.format}
        attachmentPath={examinationAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{examination}</ul>;
};
}
export default visitExaminationList;

// onViewAttachment={props.onViewAttachment}
