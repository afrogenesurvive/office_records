import React from 'react';
// import { NavLink } from 'react-router-dom';import UserAttendanceItem from './UserItem/UserAttendanceItem';
import './UserItem.css';

const userAttendanceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {props.date}</p>
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
