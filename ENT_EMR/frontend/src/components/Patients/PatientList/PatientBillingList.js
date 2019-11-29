import React from 'react';

import PatientBillingItem from './PatientItem/PatientBillingItem';
import './UserList.css';

const patientBillingList = props => {
  console.log("patient billing list props", props.patientBilling);
  const patientBilling = props.patientBilling.map(billing => {
    return (
      <PatientBillingItem
        key={billing.date}
        userId={props.authUserId}
        date={billing.date}
        title={billing.title}
        description={billing.description}
        amount={billing.amount}
        paid={billing.paid}
        type={billing.type}
        attachment={billing.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientBilling}</ul>;
};

export default patientBillingList;
