import React from 'react';
import './UserItem.css';

const userAttendanceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {new Date(props.date).toLocaleDateString()}</p>
      <p>
        Status: {props.status}
      </p>
      <p>
        Description: {props.description}
      </p>
    </div>
  </li>
);

export default userAttendanceItem;
