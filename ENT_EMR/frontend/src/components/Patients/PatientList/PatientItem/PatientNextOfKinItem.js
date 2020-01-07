import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientNextOfKinItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Name:</h6>
    <p className="userItemText">
    {props.name}
    </p>
    <h6 className="userItemHeading"> Email:</h6>
    <p className="userItemText">
    {props.email}
    </p>
    <h6 className="userItemHeading"> Phone:</h6>
    <p className="userItemText">
    {props.phone}
    </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.nextOfKin)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientNextOfKinItem;
