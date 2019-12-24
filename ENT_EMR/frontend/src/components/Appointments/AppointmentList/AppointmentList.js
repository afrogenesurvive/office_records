import React from 'react';

import AppointmentItem from './AppointmentItem/AppointmentItem';
import './UserList.css';

const appointmentList = props => {

  const appointment = props.appointments.map(appointment => {

    const appointmentDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);

    return (
      <AppointmentItem
        key={appointment._id}
        userId={appointment.authUserId}
        _id={appointment._id}
        title={appointment.title}
        date={appointmentDate}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1">{appointment}</ul>;
};

export default appointmentList;
