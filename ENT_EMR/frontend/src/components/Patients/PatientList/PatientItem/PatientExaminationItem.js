import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';


const patientExaminationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Area: {props.area}</p>
      <p>
        Type: {props.type}
      </p>
      <p>
        Measure: {props.measure}
      </p>
      <p>
        Value: {props.value}
      </p>

    </div>
  </li>
);

export default patientExaminationItem;
