import React from 'react';

import VisitSystematicInquiryItem from './PatientItem/VisitSystematicInquiryItem';
import './UserList.css';

const visitSystematicInquiryList = props => {

  let systematicInquiry = undefined;
  if (props.systematicInquiry) {
  systematicInquiry = props.systematicInquiry.map(systematicInquiryItem => {
    const visitSystematicInquiryDate = new Date(systematicInquiryItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const systematicInquiryAttachment = systematicInquiryItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+systematicInquiryItem.attachment.path+"/"+systematicInquiryItem.attachment.name+"."+systematicInquiryItem.attachment.format;

    return (
      <VisitSystematicInquiryItem
        key={systematicInquiryItem.date}
        userId={props.authUserId}
        date={visitSystematicInquiryDate}
        title={systematicInquiryItem.title}
        description={systematicInquiryItem.description}
        attachment={systematicInquiryItem.attachment}
        attachmentName={systematicInquiryAttachment.name}
        attachmentFormat={systematicInquiryAttachment.format}
        attachmentPath={systematicInquiryAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });
}

  return <ul className="user__list1_detail">{systematicInquiry}</ul>;
};

export default visitSystematicInquiryList;

// onViewAttachment={props.onViewAttachment}
