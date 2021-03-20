import React from 'react';
import classnames from "classnames";
import '../styles/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const InterviewerListItemClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={InterviewerListItemClass}
    key={props.id}
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