import React from 'react';
import Button from 'react-bootstrap/Button';
import './UserItem.css';

const userAttendanceItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {props.date}</p>
      <p>
        Status: {props.status}
      </p>
      <p>
        Description: {props.description}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.attendance)}>
        Delete
      </Button>
    )}
  </li>
);

export default userAttendanceItem;
