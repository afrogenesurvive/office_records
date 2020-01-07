import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const VisitDiagnosisItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> Title:</h6>
    <p className="userItemText">
    {props.title}
    </p>
    <h6 className="userItemHeading"> Date:</h6>
    <p className="userItemText">
    {props.date}
    </p>
    <h6 className="userItemHeading"> Type:</h6>
    <p className="userItemText">
    {props.type}
    </p>
    <h6 className="userItemHeading"> Description:</h6>
    <p className="userItemText">
    {props.description}
    </p>
    <h6 className="userItemHeading"> Name:</h6>
    <p className="userItemText">
    {props.attachmentName}
    </p>
    <h6 className="userItemHeading"> Format:</h6>
    <p className="userItemText">
    {props.attachmentFormat}
    </p>
    <h6 className="userItemHeading"> Path:</h6>
    <p className="userItemText">
    {props.attachmentPath}
    </p>
      <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
        View
      </Button>
    </div>

  </li>
);

export default VisitDiagnosisItem;
