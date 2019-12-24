import React from 'react';
import Button from 'react-bootstrap/Button';


import './UserItem.css';

const userLeaveItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Type: {props.type}</p>
      <p>
        From: {props.startDate}
      </p>
      <p>
        To: {props.endDate}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.leave)}>
        Delete
      </Button>
    )}
  </li>
);

export default userLeaveItem;
