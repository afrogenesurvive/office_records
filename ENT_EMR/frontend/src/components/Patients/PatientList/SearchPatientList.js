import React from 'react';

import SearchPatientItem from './PatientItem/SearchPatientItem';
import './UserList.css';

const searchPatientList = props => {
  const searchPatients = props.searchPatients.map(patient => {
    return (
      <SearchPatientItem
        key={patient._id}
        userId={props.authUserId}
        _id={patient._id}
        name={patient.name}
        address={patient.address}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list">{searchPatients}</ul>;
};

export default searchPatientList;
