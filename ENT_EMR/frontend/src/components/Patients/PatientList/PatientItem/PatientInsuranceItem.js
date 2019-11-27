import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';


const patientInsuranceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Company: {props.company}</p>
      <p>
        Number: {props.number}
      </p>
      <p>
        Description: {props.description}
      </p>

    </div>
  </li>
);

export default patientInsuranceItem;
