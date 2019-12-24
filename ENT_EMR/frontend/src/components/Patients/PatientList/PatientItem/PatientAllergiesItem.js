import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientAllergiesItem = props => (
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
      <p>
        Attachment Format: {props.attachment.format}
      </p>
      <p>
        Attachment Path: {props.attachment.path}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.allergies)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientAllergiesItem;
