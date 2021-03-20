import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {getAppointmentsForDay, getInterviewer, getInterviewersForDay} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers:{}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));
  const setInterviewers = interviewers => setState(prev => ({...prev, interviewers}));

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((res) => {
      setDays(res[0].data)
      setAppointments(res[1].data)
      setInterviewers(res[2].data)
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then((res) => setState({...state, appointments}))
    )
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res) => 
          setState({
            ...state,
            appointments
        })))
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios
        .put(`http://localhost:8001/api/appointments/${id}`, {interview})
        .then((res) => 
          setState({
            ...state,
            appointments
        })))
  }

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Environment Setup" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu" />
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map((appointment) => 
          <Appointment 
            key={appointment.id} 
            id={appointment.id} 
            interviewInfo={getInterviewer(state, appointment.interview)}
             interviewers = {getInterviewersForDay(state, state.day)}
            bookInterview={bookInterview}
            deleteInterview={deleteInterview}
            editInterview={editInterview}
            {...appointment}
            />
        )}
      </section>
    </main>
  );
}