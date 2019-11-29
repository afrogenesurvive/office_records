import React from 'react';

import PatientHistoryItem from './PatientItem/PatientHistoryItem';
import './UserList.css';

const patientHistoryList = props => {
  console.log("patient history list props", props.patientHistory);
  const patientHistory = props.patientHistory.map(history => {
    return (
      <PatientHistoryItem
        key={history.date}
        userId={props.authUserId}
        type={history.type}
        date={history.date}
        title={history.title}
        description={history.description}
        attachment={history.attachment}
      />
    );
  });

  return <ul className="userAttendanceList">{patientHistory}</ul>;
};

export default patientHistoryList;
