import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientExaminationItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Examination
          </Card.Title>

          <Card.Text>
          <ul className="cardUl">
            <li className="cardLi">
            <h6 className="userItemHeading"> Date:</h6>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> General:</h6>
            <p className="userItemText">
            {props.general}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Area:</h6>
            <p className="userItemText">
            {props.area}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Type:</h6>
            <p className="userItemText">
            {props.type}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Measure:</h6>
            <p className="userItemText">
            {props.measure}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Value:</h6>
            <p className="userItemText">
            {props.value}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Description:</h6>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Follow Up ?</h6>
            <p className="userItemText">
            {props.followUp}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Attachment Name:</h6>
            <p className="userItemText">
            {props.attachment.name}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Format:</h6>
            <p className="userItemText">
            {props.attachment.format}
            </p>
            </li>
            <li className="cardLi">
            <h6 className="userItemHeading"> Path:</h6>
            <p className="userItemText">
            {props.attachment.path}
            </p>
            </li>
          </ul>
          </Card.Text>
          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.examination)}>
              Delete
            </Button>
          )}
          </Card.Link>
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

export default patientExaminationItem;
