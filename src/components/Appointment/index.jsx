import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
// import Confirm from './Confirm';
// import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
// const FORM = 'FORM';
const BACK = 'BACK';
const STATUS = 'STATUS';
const CREATE = 'CREATE';
// const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
// const ERROR_DELETE = 'ERROR_DELETE';

const Appointment = (props) => {
  const initial = props.interview ? SHOW : EMPTY;
  let { mode, transition, back } = useVisualMode(initial);

  const save = (name, interviewer) => {
    transition(STATUS);
    props
      .bookInterview(props.id, { student: name, interviewer })
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  // const deleteInterview = () => {
  //   transition(STATUS);
  //   props.deleteInterview(props.id)
  //   .then(() => transition(EMPTY))
  //   .catch(() => transition(ERROR_DELETE, true))
  // }

  // const editInterview = (name, interviewer) => {
  //   transition(EDIT)
  //   props.editInterview(props.id, {student: name, interviewer})
  //   .then(() => transition(SHOW))
  // }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {(mode === EMPTY || mode === BACK) && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interviewInfo ? props.interviewInfo.student : null}
          interviewer={
            props.interviewInfo ? props.interviewInfo.interviewer : null
          }
        />
      )}
      {mode === CREATE && (
        <Form
          student={props.interviewInfo ? props.interviewInfo.student : null}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === STATUS && <Status />}
    </article>
  );
};

export default Appointment;
