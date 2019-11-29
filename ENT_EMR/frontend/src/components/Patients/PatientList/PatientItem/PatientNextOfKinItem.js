import React from 'react';

import './UserItem.css';


const patientNextOfKinItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Name: {props.name}
      </p>
      <p>
        Email: {props.email}
      </p>
      <p>
        Phone: {props.phone}
      </p>
    </div>
  </li>
);

export default patientNextOfKinItem;
