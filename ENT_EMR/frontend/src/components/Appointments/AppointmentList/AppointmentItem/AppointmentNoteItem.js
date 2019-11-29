import React from 'react';

import './UserItem.css';


const appointmentNoteItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Note: {props.note}
      </p>
    </div>
  </li>
);

export default appointmentNoteItem;
