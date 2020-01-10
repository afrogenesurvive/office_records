import React from 'react';

import './UserItem.css';

const appointmentTodayItem = props => (

  <li key={props.userId} className="users__list-item_master">
    <div>
      <p>
        <span className="bold">Time :</span> {props.time}
      </p>
      <p>
        <span className="bold">Title :</span> {props.title}
      </p>
      <p>
        <span className="bold">Date :</span> {props.todayDate}
      </p>
    </div>
  </li>
);

export default appointmentTodayItem;
