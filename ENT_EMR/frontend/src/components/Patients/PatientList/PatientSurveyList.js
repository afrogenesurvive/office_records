import React from 'react';

import PatientSurveyItem from './PatientItem/PatientSurveyItem';
import './UserList.css';

const patientSurveyList = props => {
  console.log("patient survey list props", props.patientSurvey);
  const patientSurvey = props.patientSurvey.map(survey => {
    const patientSurveyDate = new Date(survey.date.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <PatientSurveyItem
        key={survey.title}
        userId={props.authUserId}
        title={survey.title}
        date={patientSurveyDate}
        description={survey.description}
        attachment={survey.attachment}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        survey={survey}
      />
    );
  });

  return <ul className="user__list1">{patientSurvey}</ul>;
};

export default patientSurveyList;
