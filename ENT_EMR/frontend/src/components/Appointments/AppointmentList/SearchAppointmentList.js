import React from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import SearchAppointmentItem from './AppointmentItem/SearchAppointmentItem';
import './UserList.css';

const searchAppointmentList = props => {
  const searchAppointments = props.searchAppointments.map(appointment => {
    return (
      <React.Fragment>
      <Accordion.Toggle as={Button} variant="link" eventKey="5" className="btn" onClick={props.onCancel}>
            x
        </Accordion.Toggle>
      <SearchAppointmentItem
        key={appointment._id}
        userId={props.authUserId}
        _id={appointment._id}
        title={appointment.title}
        type={appointment.type}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });

  return <ul className="user__list">{searchAppointments}</ul>;
};

export default searchAppointmentList;
