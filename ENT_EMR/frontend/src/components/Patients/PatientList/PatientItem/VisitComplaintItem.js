import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';

const VisitComplaintItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Complaint
          </Card.Title>

          
          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
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
            <p className="userItemHeading"> Anamnesis:</p>
            <p className="userItemText">
            {props.anamnesis}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Name:</p>
            <p className="userItemText">
            {props.attachmentName}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Format:</p>
            <p className="userItemText">
            {props.attachmentFormat}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Path:</p>
            <p className="userItemText">
            {props.attachmentPath}
            </p>
            </li>
          </ul>
          
          <Card.Link href="">
          <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
            View
          </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>

  </li>
);

export default VisitComplaintItem;
