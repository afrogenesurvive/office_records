import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientSystematicInquiryItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            SystematicInquiry
          </Card.Title>


          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Title:</p>
            <p className="userItemText">
            {props.title}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Type:</p>
            <p className="userItemText">
            {props.type}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Description:</p>
            <p className="userItemText">
            {props.description}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Attachment:</p>
            <p className="userItemText">
            {props.attachment.name}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Format:</p>
            <p className="userItemText">
            {props.attachment.format}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Path:</p>
            <p className="userItemText">
            {props.attachment.path}
            </p>
            </li>
          </ul>

          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.systematicInquiry)}>
              Delete
            </Button>
          )}
          </Card.Link>
          <Card.Link href={props.attachmentLink} target="_blank">
          <Button variant="primary"  className="listButton">
            View
          </Button>
          {
          //   <Button variant="primary"  className="listButton" onClick={props.onViewAttachment.bind(this, props.attachment)}>
          //   View
          // </Button>
        }
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  </li>
);

export default patientSystematicInquiryItem;
