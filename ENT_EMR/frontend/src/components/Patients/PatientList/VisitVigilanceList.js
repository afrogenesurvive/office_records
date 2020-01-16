import React from 'react';

import VisitVigilanceItem from './PatientItem/VisitVigilanceItem';
import './UserList.css';

const visitVigilanceList = props => {
  console.log("VisitVigilancelist props", props.vigilance);

  let vigilance = undefined;
  if (props.vigilance) {
  vigilance = props.vigilance.map(vigilanceItem => {
    const visitVigilanceDate = new Date(vigilanceItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const vigilanceAttachment = vigilanceItem.attachment;

    console.log(`
      visitVigilanceDate: ${visitVigilanceDate},
      `);
    return (
      <VisitVigilanceItem
        key={vigilanceItem.date}
        userId={props.authUserId}
        chronicIllness={vigilanceItem.chronicIllness}
        lifestyle={vigilanceItem.lifestyle}
        screening={vigilanceItem.screening}
        vaccines={vigilanceItem.vaccines}
        vigilance={vigilanceItem}
      />
    );
  });

  return <ul className="user__list1_detail">{vigilance}</ul>;
};
}
export default visitVigilanceList;

// onViewAttachment={props.onViewAttachment}
