import React from 'react';

import PatientHistoryItem from './PatientItem/PatientHistoryItem';
import './UserList.css';

const patientHistoryList = props => {
  console.log("patient history list props", props.patientHistory);
  const patientHistory = props.patientHistory.map(history => {
    const patientHistoryDate = new Date(history.date*1000).toUTCString();
    return (
      <PatientHistoryItem
        key={history.date}
        userId={props.authUserId}
        type={history.type}
        date={patientHistoryDate}
        title={history.title}
        description={history.description}
        attachment={history.attachment}
      />
    );
  });

  return <ul className="user__list1">{patientHistory}</ul>;
};

export default patientHistoryList;
