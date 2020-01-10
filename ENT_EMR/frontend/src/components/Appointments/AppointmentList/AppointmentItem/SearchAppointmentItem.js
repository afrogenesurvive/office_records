import React from 'react';
// import { NavLink } from 'react-router-dom';


import './UserItem.css';

const searchAppointmentItem = props => (
  <li key={props.appointmentId} className="users__list-item_master">
    <div>
      <p>
      <span className="bold">Title :</span> {props.title}
      </p>
      <p>
        <span className="bold">Date :</span> {props.resultDate}
      </p>
      <p>
        <span className="bold">Time :</span> {props.time}
      </p>

    </div>
    <div>
    <button className="btn" onClick={props.onDetail.bind(this, props._id)}>
          View Details
        </button>
    </div>
  </li>
);

export default searchAppointmentItem;
