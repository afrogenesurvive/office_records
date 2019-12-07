import React from 'react';


import PatientAppointmentItem from './PatientItem/PatientAppointmentItem';
import './UserList.css';

const patientAppointmentList = props => {
  console.log("patient Appointment list props", props.patientAppointment);
  const patientAppointment = props.patientAppointment.map(appointment => {
    const patientAppointmentDate = new Date(appointment.date.substr(0,10)*1000).toLocaleString();
    return (
      <PatientAppointmentItem
        key={appointment.date}
        userId={props.authUserId}
        type={appointment.type}
        date={patientAppointmentDate}
        title={appointment.title}
        description={appointment.description}
        location={appointment.location}
      />
    );
  });

  return <ul className="user__list1">{patientAppointment}</ul>;
};

export default patientAppointmentList;
