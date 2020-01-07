import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientComplaintItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <h6 className="userItemHeading"> Date:</h6>
      <p className="userItemText">
      {props.date}
      </p>
      <h6 className="userItemHeading"> Title:</h6>
      <p className="userItemText">
      {props.title}
      </p>
      <h6 className="userItemHeading"> Description:</h6>
      <p className="userItemText">
      {props.description}
      </p>
      <h6 className="userItemHeading"> Anamnesis:</h6>
      <p className="userItemText">
      {props.anamnesis}
      </p>

      <h6 className="userItemHeading"> Attachment:</h6>
      <p className="userItemText">
      {props.attachment.name}
      </p>
      <h6 className="userItemHeading"> Format:</h6>
      <p className="userItemText">
      {props.attachment.format}
      </p>
      <h6 className="userItemHeading"> Path:</h6>
      <p className="userItemText">
      {props.attachment.path}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.complaint)}>
        Delete
      </Button>
    )}
    <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
      View
    </Button>
  </li>
);

export default patientComplaintItem;
