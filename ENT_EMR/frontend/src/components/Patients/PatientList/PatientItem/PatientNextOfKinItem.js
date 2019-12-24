import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientNextOfKinItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Name: {props.name}
      </p>
      <p>
        Email: {props.email}
      </p>
      <p>
        Phone: {props.phone}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.nextOfKin)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientNextOfKinItem;
