import React from 'react';

import './UserItem.css';


const VisitVitalsItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p>
        Date: {props.date}
      </p>
      <p>
        Pr: {props.pr}
      </p>
      <p>
        Bp1: {props.bp1}
      </p>
      <p>
        Bp2: {props.bp2}
      </p>
      <p>
        Rr: {props.rr}
      </p>
      <p>
        Temp: {props.temp}
      </p>
      <p>
        Ps02: {props.ps02}
      </p>
      <p>
        Height: {props.height}
      </p>
      <p>
        Weight: {props.weight}
      </p>
      <p>
        Bmi: {props.bmi}
      </p>
      <p>
        UrineType: {props.urineType}
      </p>
      <p>
        UrineValue: {props.urineValue}
      </p>
    </div>
  </li>
);

export default VisitVitalsItem;
