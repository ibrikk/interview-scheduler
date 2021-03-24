import React from 'react';
import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment/index';
import {
  getAppointmentsForDay,
  getInterviewer,
  getInterviewersForDay,
} from 'helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    editInterview,
    deleteInterview,
  } = useApplicationData();

  return (
    <main className='layout'>
      <section className='sidebar'>
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <DayList days={state.days} day={state.day} setDay={setDay} />
        <nav className='sidebar__menu' />
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {getAppointmentsForDay(state, state.day).map((appointment) => (
          <Appointment
            key={appointment.id}
            id={appointment.id}
            interviewInfo={getInterviewer(state, appointment.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
            bookInterview={bookInterview}
            deleteInterview={deleteInterview}
            editInterview={editInterview}
            {...appointment}
          />
        ))}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}
