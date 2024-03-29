import React from 'react';

import AppointmentNoteItem from './AppointmentItem/AppointmentNoteItem';
import './UserList.css';

const appointmentNoteList = props => {
  const appointmentNote = props.appointmentNote.map(note => {
    return (
      <AppointmentNoteItem
        key={note}
        userId={props.authUserId}
        note={note}
      />
    );
  });

  return <ul className="user__list1_master">{appointmentNote}</ul>;
};

export default appointmentNoteList;
