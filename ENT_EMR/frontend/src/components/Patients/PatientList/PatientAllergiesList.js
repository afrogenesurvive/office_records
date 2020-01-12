import React from 'react';

import PatientAllergiesItem from './PatientItem/PatientAllergiesItem';
import './UserList.css';

const patientAllergiesList = props => {
  console.log("patient allergies list props", props.patientAllergies);
  const patientAllergies = props.patientAllergies.map(allergies => {
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+allergies.attachment.path+"/"+allergies.attachment.name+"."+allergies.attachment.format;
    return (
      <PatientAllergiesItem
        key={allergies.title}
        userId={props.authUserId}
        title={allergies.title}
        type={allergies.type}
        description={allergies.description}
        attachment={allergies.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        allergies={allergies}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientAllergies}</ul>;
};

export default patientAllergiesList;
