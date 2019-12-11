import React from 'react';

import './UserItem.css';

const patientMedicationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Title: {props.title}
      </p>
      <p>
        Type: {props.type}
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
