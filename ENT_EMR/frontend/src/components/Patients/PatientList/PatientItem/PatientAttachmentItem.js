import React from 'react';
import Button from 'react-bootstrap/Button';

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
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.attachment)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientAttachmentItem;
