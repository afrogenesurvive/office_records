import React from 'react';

import PatientVisitItem from './PatientItem/PatientVisitItem';
import './UserList.css';

const patientVisitList = props => {
  const visits = props.visitList.map(visit => {

    return (
      <PatientVisitItem
        userId={props.authUserId}
        key={visit.date}
        date={visit.date}
        name={visit.patientName}
        visit={visit}
        onSelectVisit={props.onSelectVisit}
      />
    );
  });

  return <ul className="user__list1_master">{visits}</ul>;
};

export default patientVisitList;
