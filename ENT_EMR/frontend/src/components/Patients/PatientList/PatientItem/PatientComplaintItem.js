import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';


const patientComplaintItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {props.date}</p>
      <p>
        Tile: {props.title}
      </p>
      <p>
        Description: {props.description}
      </p>

    </div>
  </li>
);

export default patientComplaintItem;
