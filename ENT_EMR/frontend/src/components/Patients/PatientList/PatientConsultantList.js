import React from 'react';

import PatientConsultantItem from './PatientItem/PatientConsultantItem';
import './UserList.css';

const patientConsultantList = props => {
  console.log("patient consultant list props", props.patientConsultant);
  const patientConsultant = props.patientConsultant.map(consultant => {
    const consultantDate = new Date(consultant.date.substr(0,10)*1000).toISOString().slice(0,10);
    let consultantId = undefined;
    let consultantName = undefined;
    let consultantRole = undefined;
    if (consultant.reference !== null){
      consultantId = consultant.reference._id;
      consultantName = consultant.reference.name;
      consultantRole = consultant.reference.role;
    }
    else {
      consultantId = 'no consultant info to show';
      consultantName = 'no consultant info to show';
      consultantRole = 'no consultant info to show';
    }
    return (
      <PatientConsultantItem
        key={consultant.date}
        userId={props.authUserId}
        date={consultantDate}
        referenceId={consultantId}
        referenceName={consultantName}
        referenceRole={consultantRole}
      />
    );
  });

  return <ul className="user__list1">{patientConsultant}</ul>;
};

export default patientConsultantList;
