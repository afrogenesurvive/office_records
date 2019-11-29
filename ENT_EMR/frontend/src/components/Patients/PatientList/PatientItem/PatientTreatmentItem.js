import React from 'react';

import './UserItem.css';


const patientTreatmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Title: {props.title}
      </p>
      <p>
        Type: {props.type}
      </p>
      <p>
        Date: {props.date}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Dose: {props.dose}
      </p>
      <p>
        Frequency: {props.frequency}
      </p>
      <p>
        Attachment: {props.attachment.name}
      </p>
    </div>
  </li>
);

export default patientTreatmentItem;
