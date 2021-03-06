import React from 'react';

import PatientNoteItem from './PatientItem/PatientNoteItem';
import './UserList.css';

const patientNotesList = props => {
  const patientNotes = props.patientNotes.map(note => {

    return (
      <PatientNoteItem
        key={note}
        userId={props.authUserId}
        note={note}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
      />
    );
  });

  return <ul className="user__list1_master">{patientNotes}</ul>;
};

export default patientNotesList;
