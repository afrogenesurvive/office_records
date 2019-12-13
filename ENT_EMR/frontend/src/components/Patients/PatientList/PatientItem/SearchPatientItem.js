import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';

const searchPatientItem = props => (
  <li key={props.patientId} className="users__list-item">
  <div>
    <h5 className="userItemHeading"> Name:</h5>
    <p className="userItemText">
      {props.name}
    </p>
    <h5 className="userItemHeading"> Address:</h5>
    <p className="userItemText">
      {props.addressParish}
    </p>
    <p className="userItemText">
      {props.addressTown}
    </p>
  </div>
  <div>
  <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
        Details
      </Button>
  </div>
  </li>
);

export default searchPatientItem;
