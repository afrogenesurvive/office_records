import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientNextOfKinItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Next of Kin
          </Card.Title>


          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Name:</p>
            <p className="userItemText">
            {props.name}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Email:</p>
            <p className="userItemText">
            {props.email}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Phone:</p>
            <p className="userItemText">
            {props.phone}
            </p>
            </li>
          </ul>

          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.nextOfKin)}>
              Delete
            </Button>
          )}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>

  </li>
);

export default patientNextOfKinItem;
