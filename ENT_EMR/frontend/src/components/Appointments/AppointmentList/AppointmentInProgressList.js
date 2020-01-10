import React from 'react';

import AppointmentInProgressItem from './AppointmentItem/AppointmentInProgressItem';
import './UserList.css';

const appointmentInProgressList = props => {
  console.log("patient InProgress list props", props.appointmentInProgress);
  const appointmentInProgress = props.appointmentInProgress.map(appointment => {
    const appointmentInProgressDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <AppointmentInProgressItem
        key={appointment.title}
        userId={props.authUserId}
        inProgressDate={appointmentInProgressDate}
        title={appointment.title}
        date={appointment.date}
        time={appointment.time}
      />
    );
  });

  return <ul className="user__list1_master">{appointmentInProgress}</ul>;
};

export default appointmentInProgressList;
