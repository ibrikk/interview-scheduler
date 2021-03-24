function getAppointmentsForDay(state, day) {
  let aptArr = [];
  for (let date of state.days) {
    if (date.name === day) {
      aptArr.push(...date.appointments);
    }
  }

  let appointmentsArr = [];
  for (let aptObj in state.appointments) {
    for (let id of aptArr) {
      if (id === parseInt(aptObj)) {
        appointmentsArr.push(state.appointments[aptObj]);
      }
    }
  }
  return appointmentsArr;
}

const getInterviewer = (state, interviewer) => {
  let interviewerObj = {};

  for (let int in state.interviewers) {
    if (interviewer) {
      if (state.interviewers[int].id === interviewer.interviewer) {
        interviewerObj.interviewer = state.interviewers[int];
        interviewerObj.student = interviewer.student;
      }
    } else {
      return null;
    }
  }
  return interviewerObj;
};

function getInterviewersForDay(state, day) {
  let intArr = [];
  for (let date of state.days) {
    if (date.name === day) {
      intArr.push(...date.interviewers);
    }
  }

  let interviewersArr = [];
  for (let intObj in state.interviewers) {
    for (let id of intArr) {
      if (id === parseInt(intObj)) {
        interviewersArr.push(state.interviewers[intObj]);
      }
    }
  }
  return interviewersArr;
}

export { getAppointmentsForDay, getInterviewer, getInterviewersForDay };
