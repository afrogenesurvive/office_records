import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';


const patientComplaintItem = props => (
  <li key={props.userId} className="users__list-item">
    <div>
      <p> Date: {props.date}</p>
      <p>
        Tile: {props.title}
      </p>
      <p>
        Description: {props.description}
      </p>
      <p>
        Anamnesis: {props.anamnesis}
      </p>
    </div>
    { props.canDelete === true && (
      <Button variant="danger" onClick={props.onDelete.bind(this, props.complaint)}>
        Delete
      </Button>
    )}
    <Button variant="info" onClick={props.onViewAttachment.bind(this, props.attachment)}>
      View
    </Button>
  </li>
);

export default patientComplaintItem;
