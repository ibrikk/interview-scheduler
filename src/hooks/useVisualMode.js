import {useState} from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (change, replace) => {
    if (!replace) {
    setHistory(history => ([...history, change]));
    }
    return setMode(change);
  }

const back = () => {
  history.pop();
  return setMode(history[history.length - 1]);
}

  return {mode, transition, back};
}

export default useVisualMode;