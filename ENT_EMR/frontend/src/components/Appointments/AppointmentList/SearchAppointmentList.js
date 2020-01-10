import React from 'react';

import SearchAppointmentItem from './AppointmentItem/SearchAppointmentItem';
import './UserList.css';

const searchAppointmentList = props => {
  const searchAppointments = props.searchAppointments.map(appointment => {
    const searchAppointmentDate = new Date(appointment.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <React.Fragment>
      <SearchAppointmentItem
        key={appointment.title}
        userId={props.authUserId}
        _id={appointment._id}
        title={appointment.title}
        resultDate={searchAppointmentDate}
        time={appointment.time}
        type={appointment.type}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });

  return <ul className="user__list1_master">{searchAppointments}</ul>;
};

export default searchAppointmentList;
