import React from 'react';

import './UserItem.css';


const patientConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.date}
      </p>
      <p>
      ID: {props.referenceId}
      </p>
      <p>
        Name: {props.referenceName}
      </p>
      <p>
        Role: {props.referenceRole}
      </p>
    </div>
  </li>
);

export default patientConsultantItem;
