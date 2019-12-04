import React from 'react';

import './UserItem.css';


const patientExaminationItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Date: {props.date}
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
        Attachment : {props.attachment.name}
      </p>
      <p>
        Attachment Format: {props.attachment.format}
      </p>
      <p>
        Attachment Path: {props.attachment.path}
      </p>
    </div>
  </li>
);

export default patientExaminationItem;
