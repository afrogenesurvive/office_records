import React from 'react';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const VisitConsultantItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Consultant
          </Card.Title>

          
          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Name:</p>
            <p className="userItemText">
            {props.name}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Role:</p>
            <p className="userItemText">
            {props.role}
            </p>
            </li>
          </ul>
          
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default VisitConsultantItem;
