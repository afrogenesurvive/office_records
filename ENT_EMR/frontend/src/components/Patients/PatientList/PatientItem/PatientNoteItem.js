import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientNoteItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Note: {props.note}
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
