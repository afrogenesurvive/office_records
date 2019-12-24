import React from 'react';

import AppointmentTodayItem from './AppointmentItem/AppointmentTodayItem';
import './UserList.css';

const appointmentTodayList = props => {
  console.log("patient Today list props", props.appointmentToday);
  const appointmentToday = props.appointmentToday.map(appointment => {
    const appointmentTodayDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <AppointmentTodayItem
        key={appointment.date}
        userId={props.authUserId}
        date={appointmentTodayDate}
        title={appointment.title}
        date={appointment.date}
        time={appointment.time}
      />
    );
  });

  return <ul className="user__list1">{appointmentToday}</ul>;
};

export default appointmentTodayList;
