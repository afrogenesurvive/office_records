import React from 'react';

import PatientNextOfKinItem from './PatientItem/PatientNextOfKinItem';
import './UserList.css';

const patientNextOfKinList = props => {
  console.log("patient NextOfKin list props", props.patientNextOfKin);
  const patientNextOfKin = props.patientNextOfKin.map(nextOfKin => {
    return (
      <PatientNextOfKinItem
        key={nextOfKin.number}
        userId={props.authUserId}
        name={nextOfKin.name}
        email={nextOfKin.contact.email}
        phone={nextOfKin.contact.phone}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        nextOfKin={nextOfKin}
      />
    );
  });

  return <ul className="user__list1">{patientNextOfKin}</ul>;
};

export default patientNextOfKinList;
