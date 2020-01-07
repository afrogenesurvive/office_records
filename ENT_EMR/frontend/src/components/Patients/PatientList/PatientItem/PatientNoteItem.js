import React from 'react';
import Button from 'react-bootstrap/Button';


import './UserItem.css';


const patientNoteItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <h6 className="userItemHeading"> Note:</h6>
    <p className="userItemText">
    {props.note}
    </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.note)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientNoteItem;
