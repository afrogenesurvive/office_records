import React from 'react';

import PatientBillingItem from './PatientItem/PatientBillingItem';
import './UserList.css';

const patientBillingList = props => {
  const patientBilling = props.patientBilling.map(billing => {
    const patientBillingDate = new Date(billing.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+billing.attachment.path+"/"+billing.attachment.name+"."+billing.attachment.format;
    return (
      <PatientBillingItem
        key={billing.date}
        userId={props.authUserId}
        date={patientBillingDate}
        type={billing.type}
        title={billing.title}
        description={billing.description}
        amount={billing.amount}
        paid={billing.paid}
        notes={billing.notes}
        attachment={billing.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        billing={billing}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientBilling}</ul>;
};

export default patientBillingList;
