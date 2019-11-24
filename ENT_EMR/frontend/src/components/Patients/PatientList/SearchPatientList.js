import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

import SearchPatientItem from './PatientItem/SearchPatientItem';
import './UserList.css';

const searchPatientList = props => {
  const searchPatients = props.searchPatients.map(patient => {
    return (
      <React.Fragment>
      <Accordion.Toggle as={Button} variant="link" eventKey="1" className="btn" onClick={props.onCancel}>
      x
      </Accordion.Toggle>
      <SearchPatientItem
        key={patient._id}
        userId={props.authUserId}
        _id={patient._id}
        name={patient.name}
        address={patient.address}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });

  return <ul className="user__list">{searchPatients}</ul>;
};

export default searchPatientList;
