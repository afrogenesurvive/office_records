import React from 'react';
// import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './UserItem.css';

const searchUserItem = props => (
  <li key={props.userId} className="users__list-item_master">
    <div>
      <p className="userItemHeading"> Name:</p>
      <p className="userItemText">
        {props.name}
      </p>
      <p className="userItemHeading"> Role:</p>
      <p className="userItemText">
        {props.role}
      </p>
    </div>
    <div>
    <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
          Details
        </Button>
    </div>
  </li>
);

export default searchUserItem;
