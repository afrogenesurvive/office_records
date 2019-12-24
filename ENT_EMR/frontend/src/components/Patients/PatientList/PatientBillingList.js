import React from 'react';

import PatientBillingItem from './PatientItem/PatientBillingItem';
import './UserList.css';

const patientBillingList = props => {
  console.log("patient billing list props", props.patientBilling);
  const patientBilling = props.patientBilling.map(billing => {
    const patientBillingDate = new Date(billing.date.substr(0,10)*1000).toISOString().slice(0,10);
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
      />
    );
  });

  return <ul className="user__list1">{patientBilling}</ul>;
};

export default patientBillingList;
