import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientDiagnosisItem = props => (
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
        Attachment: {props.attachment.name}
      </p>
      <p>
        Attachment Format: {props.attachment.format}
      </p>
      <p>
        Attachment Path: {props.attachment.path}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.diagnosis)}>
        Delete
      </Button>
    )}
    <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
      View
    </Button>
  </li>
);

export default patientDiagnosisItem;
