import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const appointmentItem = props => (
  <li key={props.appointmentId} className="users__list-item">
    <div>
      <h1>{props.title}</h1>

    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props._id)}>
          View Details
        </button>
    </div>
  </li>
);

export default appointmentItem;
