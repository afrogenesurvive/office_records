import React from 'react';

import SearchPatientItem from './PatientItem/SearchPatientItem';
import './UserList.css';

const searchPatientList = props => {
  const searchPatients = props.searchPatients.map(patient => {
    return (
      <React.Fragment>
      <SearchPatientItem
        key={patient._id}
        userId={props.authUserId}
        _id={patient._id}
        name={patient.name}
        addressParish={patient.address.parish}
        addressTown={patient.address.town}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });

  return <ul className="user__list1_master">{searchPatients}</ul>;
};

export default searchPatientList;
