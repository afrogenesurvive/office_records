import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientExaminationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Date: {props.date}
      </p>
      <p>
      General: {props.general}
      </p>
      <p>
      Area: {props.area}
      </p>
      <p>
        Type: {props.type}
      </p>
      <p>
        Measure: {props.measure}
      </p>
      <p>
        Value: {props.value}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        FollowUp?: {props.followUp}
      </p>
      <p>
        Attachment : {props.attachment.name}
      </p>
      <p>
        Attachment Format: {props.attachment.format}
      </p>
      <p>
        Attachment Path: {props.attachment.path}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.examination)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientExaminationItem;
