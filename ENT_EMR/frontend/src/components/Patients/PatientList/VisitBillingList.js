import React from 'react';

import VisitBillingItem from './PatientItem/VisitBillingItem';
import './UserList.css';

const visitBillingList = props => {
  console.log("VisitBillinglist props", props.billing);

  let billing = undefined;
  if (props.billing) {
  billing = props.billing.map(billingItem => {
    const visitBillingDate = new Date(billingItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const billingAttachment = billingItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+billingItem.attachment.path+"/"+billingItem.attachment.name+"."+billingItem.attachment.format;
    console.log(`
      visitBillingDate: ${visitBillingDate},
      `);
    return (
      <VisitBillingItem
        key={billingItem.date}
        userId={props.authUserId}
        date={visitBillingDate}
        type={billingItem.type}
        title={billingItem.title}
        description={billingItem.description}
        amount={billingItem.amount}
        paid={billingItem.paid}
        notes={billingItem.notes}
        attachment={billingItem.attachment}
        attachmentName={billingAttachment.name}
        attachmentFormat={billingAttachment.format}
        attachmentPath={billingAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{billing}</ul>;
};
}
export default visitBillingList;

// onViewAttachment={props.onViewAttachment}
