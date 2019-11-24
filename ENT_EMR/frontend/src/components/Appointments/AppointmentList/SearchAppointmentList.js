import React from 'react';

import SearchAppointmentItem from './AppointmentItem/SearchAppointmentItem';
import './UserList.css';

const searchAppointmentList = props => {
  const searchAppointments = props.searchAppointments.map(appointment => {
    return (
      <SearchAppointmentItem
        key={appointment._id}
        userId={props.authUserId}
        _id={appointment._id}
        title={appointment.title}
        type={appointment.type}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list">{searchAppointments}</ul>;
};

export default searchAppointmentList;
