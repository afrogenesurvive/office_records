import React from 'react';

import PatientComplaintItem from './PatientItem/PatientComplaintItem';
import './UserList.css';

const patientComplaintList = props => {
  const patientComplaint = props.patientComplaint.map(complaint => {
    const patientComplaintDate = new Date(complaint.date.substr(0,10)*1000).toISOString().slice(0,10);
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+complaint.attachment.path+"/"+complaint.attachment.name+"."+complaint.attachment.format;
    return (
      <PatientComplaintItem
        key={complaint.date}
        userId={props.authUserId}
        date={patientComplaintDate}
        title={complaint.title}
        description={complaint.description}
        anamnesis={complaint.anamnesis}
        attachment={complaint.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        complaint={complaint}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });

  return <ul className="user__list1_detail">{patientComplaint}</ul>;
};

export default patientComplaintList;
