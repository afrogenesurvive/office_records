import React from 'react';

import VisitVitalsItem from './PatientItem/VisitVitalsItem';
import './UserList.css';

const visitVitalsList = props => {
  let vitals = undefined;
  if (props.vitals) {

    vitals = props.vitals.map(vitalsItem => {
      const visitVitalsDate = new Date(vitalsItem.date.substr(0,10)*1000).toISOString().slice(0,10);
      const vitalsUrine = vitalsItem.urine;

      return (
        <VisitVitalsItem
          key={vitalsItem.date}
          userId={props.authUserId}
          date={visitVitalsDate}
          pr={vitalsItem.pr}
          bp1={vitalsItem.bp1}
          bp2={vitalsItem.bp2}
          rr={vitalsItem.rr}
          temp={vitalsItem.temp}
          ps02={vitalsItem.ps02}
          height={vitalsItem.height}
          weight={vitalsItem.weight}
          bmi={vitalsItem.bmi}
          urineType={vitalsUrine.type}
          urineValue={vitalsUrine.value}
        />
      );
    });

  }


  return <ul className="user__list1_detail">{vitals}</ul>;
};

export default visitVitalsList;
