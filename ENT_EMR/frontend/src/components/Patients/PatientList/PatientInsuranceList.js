import React from 'react';

import PatientInsuranceItem from './PatientItem/PatientInsuranceItem';
import './UserList.css';

const patientInsuranceList = props => {
  console.log("patient insurance list props", props.patientInsurance);
  const patientInsurance = props.patientInsurance.map(insurance => {
    const patientInsuranceExpiry = new Date(insurance.expiry.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <PatientInsuranceItem
        key={insurance.number}
        userId={props.authUserId}
        company={insurance.company}
        number={insurance.number}
        expiry={patientInsuranceExpiry}
        description={insurance.description}
        subscriber={insurance.subscriber}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        insurance={insurance}
      />
    );
  });

  return <ul className="user__list1_detail">{patientInsurance}</ul>;
};

export default patientInsuranceList;
