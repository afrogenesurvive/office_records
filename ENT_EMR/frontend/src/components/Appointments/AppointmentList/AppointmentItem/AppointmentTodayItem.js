import React from 'react';

import './UserItem.css';


const appointmentTodayItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Time: {props.time}
      </p>
      <p>
        Title: {props.title}
      </p>
      <p>
        Date: {props.date}
      </p>
    </div>
  </li>
);

export default appointmentTodayItem;
