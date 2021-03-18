import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments}));

  useEffect(() => {
    // Get request to get days
    // Axios
    // .get("http://localhost:3001/api/days")
    // .then((res) => setDays(res.data))
    // .catch((err) => console.log("There was an error when trying to get days", err))
    // // Get request to get appointments
    // Axios
    // .get("http://localhost:3001/api/appointments")
    // .then((res) => setAppointments(res.data))
    // .catch((err) => console.log("There was an error when trying to get appointments", err))
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments")
    ])
    .then((res) => {
      setDays(res[0].data)
      setAppointments(res[1].data)
    })
  }, [])

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
            {...appointment}/>
        )}
      </section>
    </main>
  );
}