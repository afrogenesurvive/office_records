import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const VisitExaminationItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Examination
          </Card.Title>


          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Date:</p>
            <p className="userItemText">
            {props.date}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> General:</p>
            <p className="userItemText">
            {props.general}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Area:</p>
            <p className="userItemText">
            {props.area}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Type:</p>
            <p className="userItemText">
            {props.type}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Measure:</p>
            <p className="userItemText">
            {props.measure}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Value:</p>
            <p className="userItemText">
            {props.value}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Description:</p>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Follow Up ?</p>
            <p className="userItemText">
            {props.followUp}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Attachment Name:</p>
            <p className="userItemText">
            {props.attachmentName}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Format:</p>
            <p className="userItemText">
            {props.attachmentFormat}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Path:</p>
            <p className="userItemText">
            {props.attachmentPath}
            </p>
            </li>
          </ul>

          <Card.Link href={props.attachmentLink} target="_blank">
          <Button variant="primary"  className="listButton">
            View
          </Button>
          {
          // <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
          //   View
          // </Button>
          }
          </Card.Link>
        </Card.Body>
      </Card>
    </div>

  </li>
);

export default VisitExaminationItem;
