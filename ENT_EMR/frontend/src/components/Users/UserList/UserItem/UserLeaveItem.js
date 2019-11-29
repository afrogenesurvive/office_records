import React from 'react';

import './UserItem.css';

const userLeaveItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Type: {props.type}</p>
      <p>
        From: {new Date(props.startDate).toLocaleDateString()}
      </p>
      <p>
        To: {new Date(props.endDate).toLocaleDateString()}
      </p>
    </div>
  </li>
);

export default userLeaveItem;
