import React from 'react';

import PatientSystematicInquiryItem from './PatientItem/PatientSystematicInquiryItem';
import './UserList.css';

const patientSystematicInquiryList = props => {
  const patientSystematicInquiry = props.patientSystematicInquiry.map(systematicInquiry => {
    const patientSystematicInquiryDate = new Date(systematicInquiry.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+systematicInquiry.attachment.path+"/"+systematicInquiry.attachment.name+"."+systematicInquiry.attachment.format;
    return (
      <PatientSystematicInquiryItem
        key={systematicInquiry.title}
        userId={props.authUserId}
        title={systematicInquiry.title}
        date={patientSystematicInquiryDate}
        description={systematicInquiry.description}
        attachment={systematicInquiry.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        systematicInquiry={systematicInquiry}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientSystematicInquiry}</ul>;
};

export default patientSystematicInquiryList;
