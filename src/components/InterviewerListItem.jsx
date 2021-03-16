import React from 'react';
import classnames from "classnames";
import '../styles/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const InterviewerListItemClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={InterviewerListItemClass}
    onClick={props.setInterviewer}
    >
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.name && props.selected}
</li>
  );
}

export default InterviewerListItem;