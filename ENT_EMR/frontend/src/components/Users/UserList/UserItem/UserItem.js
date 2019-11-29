import React from 'react';

import './UserItem.css';

const userItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <h1> Name: {props.name}</h1>
      <p>
        role: {props.role}
      </p>
    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props._id)}>
          View Details
        </button>
    </div>
  </li>
);

export default userItem;
