import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

const Appointment = props => {
let component;
props.interview ?
component = <Show student={props.interview.student} interviewer={props.interview.interviewer} /> :
component = <Empty />

  return (
    <article className='appointment'>
      <Header time={props.time}/>
     {component}
    </article>
  );
}

export default Appointment;