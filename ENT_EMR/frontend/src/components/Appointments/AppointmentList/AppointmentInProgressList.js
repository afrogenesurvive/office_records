import React from 'react';

import AppointmentInProgressItem from './AppointmentItem/AppointmentInProgressItem';
import './UserList.css';

const appointmentInProgressList = props => {
  console.log("patient InProgress list props", props.appointmentInProgress);
  const appointmentInProgress = props.appointmentInProgress.map(appointment => {
    const appointmentInProgressDate = new Date(appointment.date*1000).toUTCString();
    return (
      <AppointmentInProgressItem
        key={appointment.date}
        userId={props.authUserId}
        date={appointmentInProgressDate}
        title={appointment.title}
        date={appointment.date}
        time={appointment.time}
      />
    );
  });

  return <ul className="appointmentInProgressList">{appointmentInProgress}</ul>;
};

export default appointmentInProgressList;
