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

          <Card.Text>
          <ul className="cardUl">
            <li className="cardLi">
            <h6 className="userItemHeading"> Date:</h6>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Name:</h6>
            <p className="userItemText">
            {props.name}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Role:</h6>
            <p className="userItemText">
            {props.role}
            </p>
            </li>
          </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default VisitConsultantItem;
