import React from 'react';

import './UserItem.css';


const VisitConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Date:</h6>
    <p className="userItemText">
    {props.date}
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
  </li>
);

export default VisitConsultantItem;
