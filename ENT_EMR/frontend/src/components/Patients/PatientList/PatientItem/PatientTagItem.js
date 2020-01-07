import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientTagItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <h6 className="userItemHeading"> Tag:</h6>
    <p className="userItemText">
    {props.tag}
    </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.tag)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientTagItem;
