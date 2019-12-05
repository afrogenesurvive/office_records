import React from 'react';

import PatientItem from './PatientItem/PatientItem';
import './UserList.css';

const patientList = props => {
  const patients = props.patients.map(patient => {
    return (
      <PatientItem
        key={patient._id}
        _id={patient._id}
        name={patient.name}
        address={patient.address}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1">{patients}</ul>;
};

export default patientList;
