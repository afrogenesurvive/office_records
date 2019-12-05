import React from 'react';

import PatientAllergiesItem from './PatientItem/PatientAllergiesItem';
import './UserList.css';

const patientAllergiesList = props => {
  console.log("patient allergies list props", props.patientAllergies);
  const patientAllergies = props.patientAllergies.map(allergies => {

    return (
      <PatientAllergiesItem
        key={allergies.title}
        userId={props.authUserId}
        title={allergies.title}
        description={allergies.description}
        attachment={allergies.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientAllergies}</ul>;
};

export default patientAllergiesList;
