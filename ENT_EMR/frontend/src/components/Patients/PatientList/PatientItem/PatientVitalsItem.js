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
            <h6 className="userItemHeading"> date:</h6>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Pulse Rate:</h6>
            <p className="userItemText">
            {props.pr}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Blood Pressure 1:</h6>
            <p className="userItemText">
            {props.bp1}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Blood Pressure 2:</h6>
            <p className="userItemText">
            {props.bp2}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Resp Rate:</h6>
            <p className="userItemText">
            {props.rr}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Temp:</h6>
            <p className="userItemText">
            {props.temp}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> ps02:</h6>
            <p className="userItemText">
            {props.ps02}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Height:</h6>
            <p className="userItemText">
            {props.height}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Weight:</h6>
            <p className="userItemText">
            {props.weight}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Bmi:</h6>
            <p className="userItemText">
            {props.Bmi}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Urine Type:</h6>
            <p className="userItemText">
            {props.urineType}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Urine Value:</h6>
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
