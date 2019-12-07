import React from 'react';

import PatientBillingItem from './PatientItem/PatientBillingItem';
import './UserList.css';

const patientBillingList = props => {
  console.log("patient billing list props", props.patientBilling);
  const patientBilling = props.patientBilling.map(billing => {
    const patientBillingDate = new Date(billing.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientBillingItem
        key={billing.date}
        userId={props.authUserId}
        date={patientBillingDate}
        title={billing.title}
        description={billing.description}
        amount={billing.amount}
        paid={billing.paid}
        type={billing.type}
        attachment={billing.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientBilling}</ul>;
};

export default patientBillingList;
