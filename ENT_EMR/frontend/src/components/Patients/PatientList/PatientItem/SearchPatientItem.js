import React from 'react';

import './UserItem.css';

const searchPatientItem = props => (
  <li key={props.patientId} className="users__list-item">
    <div>
      <h1> Name: {props.name}</h1>
      <p>
        Adress: {props.address}
      </p>
    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props._id)}>
          View Details
        </button>
    </div>
  </li>
);

export default searchPatientItem;
