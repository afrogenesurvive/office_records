import React from 'react';

import PatientItem from './PatientItem/PatientItem';
import './UserList.css';

const patientList = props => {
  const patients = props.patients.map(patient => {
    const patientRegistrationDate = new Date(patient.registrationDate.substr(0,10)*1000).toISOString().slice(0,10)
    return (
      <PatientItem
        key={patient._id}
        _id={patient._id}
        name={patient.name}
        registrationDate={patientRegistrationDate}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1">{patients}</ul>;
};

export default patientList;
