import React from 'react';
import Button from 'react-bootstrap/Button';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const appointmentItem = props => (

  <li key={props.appointmentId} className="users__list-item_master">
    <div>
    <h5 className="userItemHeading">Patient:</h5>
    <p className="userItemText">
      {props.patient}
    </p>
    <h5 className="userItemHeading">Date:</h5>
    <p className="userItemText">
      {props.date}
    </p>
    <h5 className="userItemHeading">Time:</h5>
    <p className="userItemText">
      {props.time}
    </p>

    </div>
    <div>
    <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
          Details
        </Button>
    </div>
  </li>
);

export default appointmentItem;
