import React from 'react';
// import { NavLink } from 'react-router-dom';


import './UserItem.css';

const searchAppointmentItem = props => (
  <li key={props.appointmentId} className="users__list-item_master">
    <div>
      <h1> Title: {props.title}</h1>
      <p>
        Type: {props.type}
      </p>

    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props._id)}>
          View Details
        </button>
    </div>
  </li>
);

export default searchAppointmentItem;
