import React from 'react';

import VisitSurveyItem from './PatientItem/VisitSurveyItem';
import './UserList.css';

const visitSurveyList = props => {

  let survey = undefined;
  if (props.survey) {
  survey = props.survey.map(surveyItem => {
    const visitSurveyDate = new Date(surveyItem.date.substr(0,10)*1000).toISOString().slice(0,10);
    const surveyAttachment = surveyItem.attachment;
    const attachmentLink = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+surveyItem.attachment.path+"/"+surveyItem.attachment.name+"."+surveyItem.attachment.format;
    
    return (
      <VisitSurveyItem
        key={surveyItem.date}
        userId={props.authUserId}
        date={visitSurveyDate}
        title={surveyItem.title}
        description={surveyItem.description}
        attachment={surveyItem.attachment}
        attachmentName={surveyAttachment.name}
        attachmentFormat={surveyAttachment.format}
        attachmentPath={surveyAttachment.path}
        onViewAttachment={props.onViewAttachment}
        attachmentLink={attachmentLink}
      />
    );
  });
}

  return <ul className="user__list1_detail">{survey}</ul>;
};

export default visitSurveyList;

// onViewAttachment={props.onViewAttachment}
