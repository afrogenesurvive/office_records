import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientVitalsItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
    <h6 className="userItemHeading"> date:</h6>
    <p className="userItemText">
    {props.date}
    </p>
    <h6 className="userItemHeading"> Pulse Rate:</h6>
    <p className="userItemText">
    {props.pr}
    </p>
    <h6 className="userItemHeading"> Blood Pressure 1:</h6>
    <p className="userItemText">
    {props.bp1}
    </p>
    <h6 className="userItemHeading"> Blood Pressure 2:</h6>
    <p className="userItemText">
    {props.bp2}
    </p>
    <h6 className="userItemHeading"> Resp Rate:</h6>
    <p className="userItemText">
    {props.rr}
    </p>
    <h6 className="userItemHeading"> Temp:</h6>
    <p className="userItemText">
    {props.temp}
    </p>
    <h6 className="userItemHeading"> ps02:</h6>
    <p className="userItemText">
    {props.ps02}
    </p>
    <h6 className="userItemHeading"> Height:</h6>
    <p className="userItemText">
    {props.height}
    </p>
    <h6 className="userItemHeading"> Weight:</h6>
    <p className="userItemText">
    {props.weight}
    </p>
    <h6 className="userItemHeading"> Bmi:</h6>
    <p className="userItemText">
    {props.Bmi}
    </p>
    <h6 className="userItemHeading"> Urine Type:</h6>
    <p className="userItemText">
    {props.urineType}
    </p>
    <h6 className="userItemHeading"> Urine Value:</h6>
    <p className="userItemText">
    {props.urineValue}
    </p>

    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.vitals)}>
        Delete
      </Button>
    )}
  </li>
);

export default patientVitalsItem;
