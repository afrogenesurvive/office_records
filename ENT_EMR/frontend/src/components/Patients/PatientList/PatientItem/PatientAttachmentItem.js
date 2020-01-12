import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './UserItem.css';


const patientAttachmentItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>
    <Card className="card">
        <Card.Body>
          <Card.Title>
            Attachment
          </Card.Title>


          <ul className="cardUl">
            <li className="cardLi">
            <p className="userItemHeading"> Name:</p>
            <p className="userItemText">
            {props.name}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Format:</p>
            <p className="userItemText">
            {props.format}
            </p>
            </li>
            <li className="cardLi">
            <p className="userItemHeading"> Path:</p>
            <p className="userItemText">
            {props.path}
            </p>
            </li>
          </ul>

          <Card.Link href="">
          { props.canDelete === true && (
            <Button variant="danger" onClick={props.onDelete.bind(this, props.attachment)}>
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

export default patientAttachmentItem;
