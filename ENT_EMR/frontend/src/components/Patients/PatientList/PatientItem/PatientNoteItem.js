import React from 'react';

import './UserItem.css';


const patientNoteItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Note: {props.note}
      </p>
    </div>
  </li>
);

export default patientNoteItem;
