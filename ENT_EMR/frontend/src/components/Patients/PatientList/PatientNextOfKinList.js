import React from 'react';

import PatientNextOfKinItem from './PatientItem/PatientNextOfKinItem';
import './UserList.css';

const patientNextOfKinList = props => {
  console.log("patient NextOfKin list props", props.patientNextOfKin);
  const patientNextOfKin = props.patientNextOfKin.map(kin => {
    return (
      <PatientNextOfKinItem
        key={kin.number}
        userId={props.authUserId}
        name={kin.name}
        email={kin.contact.email}
        phone={kin.contact.phone}
      />
    );
  });

  return <ul className="user__list1">{patientNextOfKin}</ul>;
};

export default patientNextOfKinList;
