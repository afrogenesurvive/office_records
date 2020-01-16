import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientVigilanceItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Vigilance
          </Card.Title>


          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Chronic Illness :</p>
            </li>
            <li className="cardLi">
              <span className="bold"><p className="userItemText">Diabetes</p></span>
            </li>

            <li className="cardLi">
            <p className="userItemText">
            Medication:
            </p>

            {props.chronicIllness.diabetes.medication === true && (
              <p className="userItemText">Yes</p>
            )}
            {props.chronicIllness.diabetes.medication === false && (
              <p className="userItemText">No</p>
            )}

            </li>

            <li className="cardLi">
            <p className="userItemText">
            Testing:
            </p>

            {props.chronicIllness.diabetes.testing === true && (
              <p className="userItemText">Yes</p>
            )}
            {props.chronicIllness.diabetes.testing === false && (
              <p className="userItemText">No</p>
            )}

            </li>

            <li className="cardLi">
            <p className="userItemText">
            Comment: {props.chronicIllness.diabetes.comment}
            </p>
            </li>
          </ul>

          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.vigilance)}>
              Delete
            </Button>
          )}
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default patientVigilanceItem;
