import React from 'react';
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const userItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <h1> Name: {props.name
        // <p>
        //   {props._id}
        // </p>
        // <p>
        //   {props.role}
        // </p>
        // <p>
        //   {props.email}
        // </p>
      }</h1>
      <p>
        Address: {props.address}
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
