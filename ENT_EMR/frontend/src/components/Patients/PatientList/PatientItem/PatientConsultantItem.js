import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientConsultantItem = props => (
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
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> ID:</p>
            <p className="userItemText">
            {props.referenceId}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Name:</p>
            <p className="userItemText">
            {props.referenceName}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Role:</p>
            <p className="userItemText">
            {props.referenceRole}
            </p>
            </li>
          </ul>
          </Card.Text>
          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.consultant)}>
              Delete
            </Button>
          )}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default patientConsultantItem;
