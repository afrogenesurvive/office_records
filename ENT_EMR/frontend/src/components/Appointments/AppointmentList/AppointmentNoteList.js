import React from 'react';

import AppointmentNoteItem from './AppointmentItem/AppointmentNoteItem';
import './UserList.css';

const appointmentNoteList = props => {
  console.log("appointment notes list props", props.appointmentNote);
  const appointmentNote = props.appointmentNote.map(note => {
    return (
      <AppointmentNoteItem
        key={note}
        userId={props.authUserId}
        note={note}
      />
    );
  });

  return <ul className="userAttendanceList">{appointmentNote}</ul>;
};

export default appointmentNoteList;
