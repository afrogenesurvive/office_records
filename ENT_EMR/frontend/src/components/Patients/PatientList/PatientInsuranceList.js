import React from 'react';

import PatientInsuranceItem from './PatientItem/PatientInsuranceItem';
import './UserList.css';

const patientInsuranceList = props => {
  console.log("patient insurance list props", props.patientInsurance);
  const patientInsurance = props.patientInsurance.map(insurance => {
    const patientInsuranceExpiry = new Date(insurance.expiry*1000).toUTCString();
    return (
      <PatientInsuranceItem
        key={insurance.number}
        userId={props.authUserId}
        company={insurance.company}
        number={insurance.number}
        expiry={patientInsuranceExpiry}
        description={insurance.description}
        subscriber={insurance.subscriber}
      />
    );
  });

  return <ul className="user__list1">{patientInsurance}</ul>;
};

export default patientInsuranceList;
