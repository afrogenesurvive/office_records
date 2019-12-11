import React from 'react';

import './UserItem.css';


const patientAttachmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Name: {props.name}
      </p>
      <p>
        Format: {props.format}
      </p>
      <p>
        Path: {props.path}
      </p>
    </div>
  </li>
);

export default patientAttachmentItem;
