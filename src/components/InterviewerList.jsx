import React from 'react';
import '../styles/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = props => {
  console.log(props.interviewers)
const InterviewerItems = props.interviewers.
map((interviewer) => <InterviewerListItem
  key={interviewer.id}
  name={interviewer.name}
  avatar={interviewer.avatar}
  setInterviewer={(event) => props.setInterviewer(interviewer.id)}
  selected={props.interviewer === interviewer.id}
  />);

  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
  {InterviewerItems}
  </ul>
</section>
  );
}

export default InterviewerList;
