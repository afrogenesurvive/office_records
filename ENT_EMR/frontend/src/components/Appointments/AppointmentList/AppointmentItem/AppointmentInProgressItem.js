import React from 'react';

import './UserItem.css';


const appointmentInProgressItem = props => (
  <li key={props.userId} className="users__list-item_master">
    <div>
      <p>
        <span className="bold">Time :</span> {props.time}
      </p>
      <p>
        <span className="bold">Title :</span> {props.title}
      </p>
      <p>
        <span className="bold">Date :</span> {props.inProgressDate}
      </p>
    </div>
  </li>
);

export default appointmentInProgressItem;
