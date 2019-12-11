import React from 'react';

import PatientVitalsItem from './PatientItem/PatientVitalsItem';
import './UserList.css';

const patientVitalsList = props => {
  console.log("patient Vitals list props", props.patientVitals);
  const patientVitals = props.patientVitals.map(vitals => {
    const patientVitalsDate = new Date(vitals.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientVitalsItem
        key={patientVitalsDate}
        userId={props.authUserId}
        pr={vitals.pr}
        bp1={vitals.bp1}
        bp2={vitals.bp2}
        rr={vitals.rr}
        temp={vitals.temp}
        height={vitals.height}
        weight={vitals.weight}
        bmi={vitals.bmi}
        urineType={vitals.urine.type}
        urineValue={vitals.urine.value}
        />
    );
  });

  return <ul className="user__list1">{patientVitals}</ul>;
};

export default patientVitalsList;
