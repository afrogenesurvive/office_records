import React from 'react';

import './UserItem.css';


const patientTagItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
      Tag: {props.tag}
      </p>
    </div>
  </li>
);

export default patientTagItem;
