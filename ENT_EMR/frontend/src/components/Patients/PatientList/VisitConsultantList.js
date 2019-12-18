import React from 'react';

import VisitConsultantItem from './PatientItem/VisitConsultantItem';
import './UserList.css';

const visitConsultantList = props => {
  console.log("VisitConsultantlist props", props.consultant);

  let consultant = undefined;
  if (props.consultant) {
  consultant = props.consultant.map(consultantItem => {
    const visitConsultantDate = new Date(consultantItem.date.substr(0,10)*1000).toLocaleString();
    const consultantReference = consultantItem.reference;
    console.log(`
      visitConsultantDate: ${visitConsultantDate},
      consultantReference: ${JSON.stringify(consultantReference)},
      `);
    return (
      <VisitConsultantItem
        key={consultantItem.date}
        userId={props.authUserId}
        date={visitConsultantDate}
        name={consultantReference.name}
        role={consultantReference.role}
      />
    );
  });

  return <ul className="user__list1">{consultant}</ul>;
};
}
export default visitConsultantList;
