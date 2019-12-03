import React from 'react';

import './UserItem.css';


const patientConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.consultant.date}
      </p>
      <p>
      ID: {props.consultant.reference._id}
      </p>
      <p>
        Name: {props.consultant.reference.name}
      </p>
      <p>
        Role: {props.consultant.reference.role}
      </p>
    </div>
  </li>
);

export default patientConsultantItem;
