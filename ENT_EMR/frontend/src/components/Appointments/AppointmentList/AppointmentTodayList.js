import React from 'react';

import AppointmentTodayItem from './AppointmentItem/AppointmentTodayItem';
import './UserList.css';

const appointmentTodayList = props => {
  console.log("patient Today list props", props.appointmentToday);
  const appointmentToday = props.appointmentToday.map(appointment => {
    const appointmentTodayDate = new Date(appointment.date*1000).toUTCString();
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

  return <ul className="appointmentTodayList">{appointmentToday}</ul>;
};

export default appointmentTodayList;
