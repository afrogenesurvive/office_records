import React from 'react';

import PatientItem from './PatientItem/PatientItem';
import './UserList.css';

const patientList = props => {
  const patients = props.patients.map(patient => {
    let patientRegistrationDate = null;
    if (patient.registrationDate !== null) {
       patientRegistrationDate = new Date(patient.registrationDate.substr(0,10)*1000).toISOString().slice(0,10)
    }

    return (
      <PatientItem
        key={patient._id}
        _id={patient._id}
        name={patient.name}
        age={patient.age}
        gender={patient.gender}
        registrationDate={patientRegistrationDate}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1_master">{patients}</ul>;
};

export default patientList;
