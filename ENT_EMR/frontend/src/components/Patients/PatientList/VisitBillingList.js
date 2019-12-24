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
        attachmentName={billingAttachment.name}
        attachmentFormat={billingAttachment.format}
        attachmentPath={billingAttachment.path}
      />
    );
  });

  return <ul className="user__list1">{billing}</ul>;
};
}
export default visitBillingList;
