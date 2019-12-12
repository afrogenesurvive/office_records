import React from 'react';
import Button from 'react-bootstrap/Button';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const appointmentItem = props => (

  <li key={props.appointmentId} className="users__list-item">
    <div>
      <h1>{props.title}</h1>
      <p>{props.date}</p>

    </div>
    <div>
    <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
          Details
        </Button>
    </div>
  </li>
);

export default appointmentItem;
