import React from 'react';
import Button from 'react-bootstrap/Button';

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
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.treatment)}>
        Delete
      </Button>
    )}
    <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
      View
    </Button>
  </li>
);

export default patientTreatmentItem;
