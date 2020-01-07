import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientInsuranceItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Insurance
          </Card.Title>

          <Card.Text>
          <ul className="cardUl">
            <li className="cardLi">
            <h6 className="userItemHeading"> Company:</h6>
            <p className="userItemText">
            {props.company}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Number:</h6>
            <p className="userItemText">
            {props.number}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Description:</h6>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Expiry:</h6>
            <p className="userItemText">
            {props.expiry}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Subscriber Company:</h6>
            <p className="userItemText">
            {props.subscriber.company}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Subscriber Description:</h6>
            <p className="userItemText">
            {props.subscriber.description}
            </p>
            </li>
          </ul>
          </Card.Text>
          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.insurance)}>
              Delete
            </Button>
          )}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default patientInsuranceItem;
