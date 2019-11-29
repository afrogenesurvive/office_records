import React from 'react';

import './UserItem.css';


const patientComplaintItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {new Date(props.date).toLocaleDateString()}</p>
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
