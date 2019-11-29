import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';


const patientHistoryItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Type: {props.type}
      </p>
      <p>
        Date: {props.date}
      </p>
      <p>
        Title: {props.title}
      </p>
      <p>
        Description: {props.description}
      </p>
    </div>
  </li>
);

export default patientHistoryItem;
