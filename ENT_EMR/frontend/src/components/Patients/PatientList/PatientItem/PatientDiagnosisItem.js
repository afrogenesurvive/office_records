import React from 'react';

import './UserItem.css';


const patientDiagnosisItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Title: {props.title}
      </p>
      <p>
        Date: {props.date}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Attachment: {props.attachment.name}
      </p>
      <p>
        Attachment Format: {props.attachment.format}
      </p>
      <p>
        Attachment Path: {props.attachment.path}
      </p>
    </div>
  </li>
);

export default patientDiagnosisItem;
