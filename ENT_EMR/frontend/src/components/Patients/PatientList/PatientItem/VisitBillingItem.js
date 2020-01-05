import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const VisitBillingItem = props => (
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
        Amount: {props.amount}
      </p>
      <p>
        Paid: {props.paid}
      </p>
      <p>
        Notes: {props.notes}
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
      <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
        View
      </Button>
    </div>
  </li>
);

export default VisitBillingItem;
