import React from 'react';

import PatientInsuranceItem from './PatientItem/PatientInsuranceItem';
import './UserList.css';

const patientInsuranceList = props => {
  console.log("patient insurance list props", props.patientInsurance);
  const patientInsurance = props.patientInsurance.map(insurance => {
    return (
      <PatientInsuranceItem
        key={insurance.number}
        userId={props.authUserId}
        company={insurance.company}
        number={insurance.number}
        description={insurance.description}
      />
    );
  });

  return <ul className="userAttendanceList">{patientInsurance}</ul>;
};

export default patientInsuranceList;
