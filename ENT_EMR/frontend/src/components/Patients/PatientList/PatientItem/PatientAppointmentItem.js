import React from 'react';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientAppointmentItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
        <Card.Body>
          <Card.Title>
            Appointment
          </Card.Title>

          <Card.Text>
          <ul className="cardUl">
            <li className="cardLi">
            <h6 className="userItemHeading"> Type:</h6>
            <p className="userItemText">
            {props.type}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Date:</h6>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Title:</h6>
            <p className="userItemText">
            {props.title}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Description:</h6>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Location:</h6>
            <p className="userItemText">
            {props.location}
            </p>
            </li>
          </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default patientAppointmentItem;
