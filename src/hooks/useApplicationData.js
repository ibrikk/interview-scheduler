import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState((prev) => ({ ...prev, day }));
  const setDays = days => setState((prev) => ({ ...prev, days }));
  const setAppointments = appointments => setState((prev) => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState((prev) => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((res) => {
      setDays(res[0].data);
      setAppointments(res[1].data);
      setInterviewers(res[2].data);
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => setState({ ...state, appointments }));
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) =>
        setState({
          ...state,
          appointments,
        })
      );
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) =>
        setState({
          ...state,
          appointments,
        })
      );
  }
  return {
    state,
    setDay,
    bookInterview,
    editInterview,
    deleteInterview
  }

};

export default useApplicationData;
