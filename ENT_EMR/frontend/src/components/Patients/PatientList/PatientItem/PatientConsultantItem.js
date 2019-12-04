import React from 'react';

import './UserItem.css';


const patientConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.date}
      </p>
      <p>
      ID: {props.reference._id}
      </p>
      <p>
        Name: {props.reference.name}
      </p>
      <p>
        Role: {props.reference.role}
      </p>
    </div>
  </li>
);

export default patientConsultantItem;
