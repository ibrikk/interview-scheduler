import { useReducer, useEffect } from 'react';
import axios from 'axios';
const ENV = process.env.REACT_APP_WEBSOCKET_URL;

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const setDay = day => dispatch({ type: SET_DAY, day});
const setApplicationData = (days, appointments, interviewers) => dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DAY':
      return { ...state, day: action.day }
    case 'SET_APPLICATION_DATA':
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case 'SET_INTERVIEW': 
      return {...state, appointment: action.appointments}
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

useEffect(() => {
 const ws = new WebSocket(ENV);
 ws.addEventListener('open', () => {
   ws.send('ping')
 })
 ws.addEventListener('message', (event) => {
   console.log(JSON.parse(event.data));
   if (JSON.parse(event.data) !== 'pong') {
     dispatch(JSON.parse(event.data))
   }
 })
 return () => { ws.close(); }
}, [])

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((res) => {
      setApplicationData(res[0].data, res[1].data, res[2].data)
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
      .then((res) => dispatch({ type: SET_INTERVIEW, appointments }));
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
        dispatch({
          type: SET_INTERVIEW,
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
        dispatch({
          type: SET_INTERVIEW,
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
