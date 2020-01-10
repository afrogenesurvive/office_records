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
            <p className="userItemHeading"> Type:</p>
            <p className="userItemText">
            {props.type}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Time:</p>
            <p className="userItemText">
            {props.time}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Title:</p>
            <p className="userItemText">
            {props.title}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Description:</p>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Location:</p>
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
