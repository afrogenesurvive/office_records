import React from 'react';

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
    </div>
  </li>
);

export default VisitExaminationItem;
