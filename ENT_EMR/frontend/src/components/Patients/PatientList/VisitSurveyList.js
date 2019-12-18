import React from 'react';

import VisitSurveyItem from './PatientItem/VisitSurveyItem';
import './UserList.css';

const visitSurveyList = props => {
  console.log("VisitSurveylist props", props.survey);

  let survey = undefined;
  if (props.survey) {
  survey = props.survey.map(surveyItem => {
    const visitSurveyDate = new Date(surveyItem.date.substr(0,10)*1000).toLocaleString();
    const surveyAttachment = surveyItem.attachment;
    console.log(`
      visitSurveyDate: ${visitSurveyDate},
      `);
    return (
      <VisitSurveyItem
        key={surveyItem.date}
        userId={props.authUserId}
        date={visitSurveyDate}
        title={surveyItem.title}
        description={surveyItem.description}
        attachmentName={surveyAttachment.name}
        attachmentFormat={surveyAttachment.format}
        attachmentPath={surveyAttachment.path}
      />
    );
  });
}

  return <ul className="user__list1">{survey}</ul>;
};

export default visitSurveyList;
