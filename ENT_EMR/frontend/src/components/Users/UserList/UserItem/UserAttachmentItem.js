import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const userAttachmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Name: {props.name}</p>
      <p>
        Format: {props.format}
      </p>
      <p>
        Path: {props.path}
      </p>

    </div>
  </li>
);

export default userAttachmentItem;
