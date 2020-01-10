import React from 'react';

import AppointmentItem from './AppointmentItem/AppointmentItem';
import './UserList.css';

const appointmentList = props => {

  const appointment = props.appointments.map(appointment => {

    const appointmentDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
    const appointmentPatient = appointment.patient;

    return (
      <AppointmentItem
        key={appointment.title}
        userId={appointment.authUserId}
        _id={appointment._id}
        title={appointment.title}
        patient={appointmentPatient.name}
        date={appointmentDate}
        time={appointment.time}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1_master">{appointment}</ul>;
};

export default appointmentList;
