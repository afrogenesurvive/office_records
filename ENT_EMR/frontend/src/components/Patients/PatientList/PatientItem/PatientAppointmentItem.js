import React from 'react';

import './UserItem.css';


const patientAppointmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Type:</h6>
    <p className="userItemText">
    {props.type}
    </p>
    <h6 className="userItemHeading"> Date:</h6>
    <p className="userItemText">
    {props.date}
    </p>
    <h6 className="userItemHeading"> Title:</h6>
    <p className="userItemText">
    {props.title}
    </p>
    <h6 className="userItemHeading"> Description:</h6>
    <p className="userItemText">
    {props.description}
    </p>
    <h6 className="userItemHeading"> Location:</h6>
    <p className="userItemText">
    {props.location}
    </p>

    </div>
  </li>
);

export default patientAppointmentItem;
