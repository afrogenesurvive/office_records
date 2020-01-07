import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
// import { NavLink } from 'react-router-dom';

import './UserItem.css';

const userAttachmentItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          Attachment
        </Card.Title>

        <Card.Text>
        <ul className="cardUl">
          <li className="cardLi">
          <h6 className="userItemHeading"> Name:</h6>
          <p className="userItemText">
          {props.name}
          </p>
          </li>
          <li>
          <h6 className="userItemHeading"> Format:</h6>
          <p className="userItemText">
          {props.format}
          </p>
          </li>
          <li>
          <h6 className="userItemHeading"> Path:</h6>
          <p className="userItemText">
          {props.path}
          </p>
          </li>
        </ul>
        </Card.Text>
        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger"  className="listButton" onClick={props.onDelete.bind(this, props.attachment)}>
            Delete
          </Button>
        )}
        </Card.Link>
        <Card.Link href="">
        <Button variant="primary"  className="listButton" onClick={props.onViewAttachment.bind(this, props.attachment)}>
          View
        </Button>
        </Card.Link>
      </Card.Body>
    </Card>

    </div>


  </li>
);

export default userAttachmentItem;
