import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientAttachmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Name:</h6>
    <p className="userItemText">
    {props.name}
    </p>
    <h6 className="userItemHeading"> Format:</h6>
    <p className="userItemText">
    {props.format}
    </p>
    <h6 className="userItemHeading"> Path:</h6>
    <p className="userItemText">
    {props.path}
    </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.attachment)}>
        Delete
      </Button>
    )}
    <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
      View
    </Button>
  </li>
);

export default patientAttachmentItem;
