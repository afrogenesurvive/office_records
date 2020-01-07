import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Date:</h6>
    <p className="userItemText">
    {props.date}
    </p>
    <h6 className="userItemHeading"> ID:</h6>
    <p className="userItemText">
    {props.referenceId}
    </p>
    <h6 className="userItemHeading"> Name:</h6>
    <p className="userItemText">
    {props.name}
    </p>
    <h6 className="userItemHeading"> Role:</h6>
    <p className="userItemText">
    {props.role}
    </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.consultant)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientConsultantItem;
