import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientInsuranceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Company:</h6>
    <p className="userItemText">
    {props.company}
    </p>
    <h6 className="userItemHeading"> Number:</h6>
    <p className="userItemText">
    {props.number}
    </p>
    <h6 className="userItemHeading"> Description:</h6>
    <p className="userItemText">
    {props.description}
    </p>
    <h6 className="userItemHeading"> Expiry:</h6>
    <p className="userItemText">
    {props.expiry}
    </p>
    <h6 className="userItemHeading"> Subscriber Company:</h6>
    <p className="userItemText">
    {props.subscriber.company}
    </p>
    <h6 className="userItemHeading"> Subscriber Description:</h6>
    <p className="userItemText">
    {props.subscriber.description}
    </p>
      
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.insurance)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientInsuranceItem;
