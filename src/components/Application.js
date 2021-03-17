import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment/index';



export default function Application(props) {

  const [days, setDays] = useState([]);

  useEffect(() => {
  axios
  .get('http://localhost:8001/api/days')
  .then((res) => setDays(res.data))
  .catch((err) => console.log(`There was an error when trying to get days ${err}`))
  }, [days])

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "3pm",
      interview: {
        student: "Ibreim",
        interviewer: {
          id: 2,
          name: "Sylvester Pam",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }, 
    {
      id: "last",
      time: "8pm"
    }
  ];


  
const [ day, setDay ] = useState("Monday");

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <DayList
          days={days}
          day={day}
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
        {appointments.map((appointment) => 
          <Appointment key={appointment.id} {...appointment} /> )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}