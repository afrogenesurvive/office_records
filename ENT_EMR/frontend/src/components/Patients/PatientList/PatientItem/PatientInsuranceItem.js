import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientInsuranceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Company: {props.company}
      </p>
      <p>
        Number: {props.number}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Expiry: {props.expiry}
      </p>
      <p>
        Subscriber Company: {props.subscriber.company}
      </p>
      <p>
        Subscriber Description: {props.subscriber.description}
      </p>
    </div>
      {
        // <Button variant="primary" value={props.insurance} onClick={props.onDelete(this)}>
        //   Delete
        // </Button>
      }
  </li>
);

export default patientInsuranceItem;
