import React from 'react';

import './UserItem.css';


const patientAppointmentItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Type: {props.type}
      </p>
      <p>
        Date: {props.date}
      </p>
      <p>
        Title: {props.title}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Location : {props.location}
      </p>
    </div>
  </li>
);

export default patientAppointmentItem;
