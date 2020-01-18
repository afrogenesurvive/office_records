import React from 'react';

import VisitConsultantItem from './PatientItem/VisitConsultantItem';
import './UserList.css';

const visitConsultantList = props => {

  let consultant = undefined;
  if (props.consultant) {
  consultant = props.consultant.map(consultantItem => {
    const visitConsultantDate = new Date(consultantItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const consultantReference = consultantItem.reference;
    
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

  return <ul className="user__list1_detail">{consultant}</ul>;
};
}
export default visitConsultantList;
