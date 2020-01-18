import React from 'react';

import AppointmentTodayItem from './AppointmentItem/AppointmentTodayItem';
import './UserList.css';

const appointmentTodayList = props => {
  const appointmentToday = props.appointmentToday.map(appointment => {
    const appointmentTodayDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <AppointmentTodayItem
        key={appointment.title}
        userId={props.authUserId}
        todayDate={appointmentTodayDate}
        title={appointment.title}
        date={appointment.date}
        time={appointment.time}
      />
    );
  });

  return <ul className="user__list1_master">{appointmentToday}</ul>;
};

export default appointmentTodayList;
