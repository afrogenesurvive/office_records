import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientConsultantItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.date}
      </p>
      <p>
      ID: {props.referenceId}
      </p>
      <p>
        Name: {props.referenceName}
      </p>
      <p>
        Role: {props.referenceRole}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.consultant)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientConsultantItem;
