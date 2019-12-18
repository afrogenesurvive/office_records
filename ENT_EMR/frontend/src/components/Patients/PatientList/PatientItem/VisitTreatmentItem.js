import React from 'react';

import './UserItem.css';


const VisitInvestigationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.date}
      </p>
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
        Dose: {props.dose}
      </p>
      <p>
        Frequency: {props.frequency}
      </p>
      <p>
        Attachment:
      </p>
      <p>
        Name: {props.attachmentName}
      </p>
      <p>
        Format: {props.attachmentFormat}
      </p>
      <p>
        Path: {props.attachmentPath}
      </p>
    </div>
  </li>
);

export default VisitInvestigationItem;
