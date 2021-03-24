import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const [bool, setbool] = useState(false);

  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';
  const setDay = (day) => dispatch({ type: SET_DAY, day });
  const setApplicationData = (days, appointments, interviewers) =>
    dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_DAY':
        return { ...state, day: action.day };
      case 'SET_APPLICATION_DATA':
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
      case 'SET_INTERVIEW':
        return { ...state, appointments: action.appointments };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  useEffect(() => {
    let ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.addEventListener('open', () => {
      ws.onmessage = (event) => {
        const { type, id, interview } = JSON.parse(event.data);
        // update appointments
        const appointment = {
          ...state.appointments[id],
          interview,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        const update = {
          type,
          appointments,
        };
        if (type) {
          dispatch(update);
        }
      };
    });

    return () => {
      ws.close();
    };
  }, [state.appointments]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((res) => {
      setApplicationData(res[0].data, res[1].data, res[2].data);
    });
  }, [bool]);

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
      .then((res) => {
        if (bool) {
          setbool(false);
        } else {
          setbool(true);
        }
        dispatch({ type: SET_INTERVIEW, appointments });
      });
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
      .then((res) => {
        if (bool) {
          setbool(false);
        } else {
          setbool(true);
        }
        dispatch({
          type: SET_INTERVIEW,
          appointments,
        });
      });
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
      .then((res) => {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
        });
      });
  }
  return {
    state,
    setDay,
    bookInterview,
    editInterview,
    deleteInterview,
  };
};

export default useApplicationData;
