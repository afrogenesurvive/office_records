import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const VisitExaminationItem = props => (
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
        FollowUp: {props.followUp}
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

export default VisitExaminationItem;
