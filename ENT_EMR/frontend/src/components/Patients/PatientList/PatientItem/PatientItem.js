import React from 'react';
import Button from 'react-bootstrap/Button';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const patientItem = props => (
  <li key={props.patientId} className="users__list-item_master">
  <div>
    <h5 className="userItemHeading"> Name:</h5>
    <p className="userItemText">
      {props.name}
    </p>
    <h5 className="userItemHeading"> Age:</h5>
    <p className="userItemText">
      {props.age}
    </p>
    <h5 className="userItemHeading"> Gender:</h5>
    <p className="userItemText">
      {props.gender}
    </p>
  </div>
  <div>
  <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
        Details
      </Button>
  </div>
  </li>
);

export default patientItem;
