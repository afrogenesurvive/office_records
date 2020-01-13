import React from 'react';
import Button from 'react-bootstrap/Button';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const patientVisitItem = props => (
  <li key={props.userId} className="users__list-item_master">
  <div>
    <h5 className="userItemHeading"> Visit Patient Name:</h5>
    <p className="userItemText">
      {props.name}
    </p>
    <h5 className="userItemHeading"> Visit Date:</h5>
    <p className="userItemText">
      {props.date}
    </p>
  </div>
  <div>
    <Button variant="primary" onClick={props.onSelectVisit.bind(this, props.visit)}>
      Details
    </Button>
  </div>
  </li>
);

export default patientVisitItem;
