import React from 'react';

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
  </li>
);

export default userLeaveItem;
