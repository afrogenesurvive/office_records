import React from 'react';

import PatientTagItem from './PatientItem/PatientTagItem';
import './UserList.css';

const patientTagsList = props => {
  console.log("patient Tags list props", props.patientTags);
  const patientTags = props.patientTags.map(tag => {

    return (
      <PatientTagItem
        key={tag}
        userId={props.authUserId}
        tag={tag}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
      />
    );
  });

  return <ul className="user__list1_master">{patientTags}</ul>;
};

export default patientTagsList;
