import React from 'react';

import './UserItem.css';


const appointmentNoteItem = props => (
  <li key={props.userId} className="users__list-item_master">
    <div>
      <p>
        Note: {props.note}
      </p>
    </div>
  </li>
);

export default appointmentNoteItem;
