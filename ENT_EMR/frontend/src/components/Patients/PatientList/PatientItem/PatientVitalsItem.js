import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientVitalsItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Vitals
          </Card.Title>

          <Card.Text>
          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Pulse Rate:</p>
            <p className="userItemText">
            {props.pr}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Blood Pressure 1:</p>
            <p className="userItemText">
            {props.bp1}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Blood Pressure 2:</p>
            <p className="userItemText">
            {props.bp2}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Resp Rate:</p>
            <p className="userItemText">
            {props.rr}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Temp:</p>
            <p className="userItemText">
            {props.temp}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> ps02:</p>
            <p className="userItemText">
            {props.ps02}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Height:</p>
            <p className="userItemText">
            {props.height}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Weight:</p>
            <p className="userItemText">
            {props.weight}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Bmi:</p>
            <p className="userItemText">
            {props.Bmi}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Urine Type:</p>
            <p className="userItemText">
            {props.urineType}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Urine Value:</p>
            <p className="userItemText">
            {props.urineValue}
            </p>
            </li>
          </ul>
          </Card.Text>
          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.vitals)}>
              Delete
            </Button>
          )}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>

  </li>
);

export default patientVitalsItem;
