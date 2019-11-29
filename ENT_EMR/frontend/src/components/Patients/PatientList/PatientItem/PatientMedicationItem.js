import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';


const patientMedicationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Title: {props.title}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Attachment: {props.attachment.name}
      </p>
    </div>
  </li>
);

export default patientMedicationItem;
