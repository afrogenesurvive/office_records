import React from 'react';

import './GroupItem.css';

const groupItem = props => (
  <li key={props.userId} className="groups__list-item">
    <div>
      <h1>{props.name}</h1>
      <p>
        {props._id}
      </p>
      <p>
        {props.username}
      </p>
      <p>
        {props.email}
      </p>
      <p>
        {props.dob}
      </p>
      <p>
        {props.description}
      </p>
      <p>
        {props.avatar}
      </p>
      <p>
        {props.address}
      </p>
      <p>
        {props.phone}
      </p>
      <p>
        {props.socialMedia}
      </p>
    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props.id)}>
          View Details
        </button>
    </div>
  </li>
);

export default groupItem;
