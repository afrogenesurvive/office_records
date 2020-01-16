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
