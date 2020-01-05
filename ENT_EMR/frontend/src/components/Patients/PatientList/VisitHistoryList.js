import React from 'react';

import VisitHistoryItem from './PatientItem/VisitHistoryItem';
import './UserList.css';

const visitHistoryList = props => {
  console.log("VisitHistorylist props", props.history);

  let history = undefined;
  if (props.history) {
  history = props.history.map(historyItem => {
    const visitHistoryDate = new Date(historyItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const historyAttachment = historyItem.attachment;
    console.log(`
      visitHistoryDate: ${visitHistoryDate},
      `);
    return (
      <VisitHistoryItem
        key={historyItem.date}
        userId={props.authUserId}
        date={visitHistoryDate}
        title={historyItem.title}
        description={historyItem.description}
        attachment={historyItem.attachment}
        attachmentName={historyAttachment.name}
        attachmentFormat={historyAttachment.format}
        attachmentPath={historyAttachment.path}
        onViewAttachment={props.onViewAttachment}
      />
    );
  });

  return <ul className="user__list1">{history}</ul>;
};
}
export default visitHistoryList;

  // onViewAttachment={props.onViewAttachment}
