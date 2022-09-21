import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

function AnswerList({
  answerListLength,
  displayList,
  showMoreAnswers,
  handleSeeMoreAnswers,
  handleCollapseAnswers,
}) {
  let linkDisplay;
  if (showMoreAnswers) {
    linkDisplay =
      answerListLength > 2 ? (
        <div className="more-answers" onClick={handleSeeMoreAnswers}>
          See more answers
        </div>
      ) : null;
  } else {
    linkDisplay =
      answerListLength <= 2 ? null : (
        <div className="more-answers" onClick={handleCollapseAnswers}>
          Collapse answers
        </div>
      );
  }

  const scrollAnswers =
    displayList.length > 2 ? (
      <div id="answer-list">
        {displayList.map((a) => (
          <Answer
            key={a.answer_id}
            answer_id={a.answer_id}
            answerer_name={a.answerer_name}
            body={a.body}
            date={a.date}
            answer_helpfulness={a.helpfulness}
            photos={a.photos}
          />
        ))}
      </div>
    ) : (
      <div>
        {displayList.map((a) => (
          <Answer
            key={a.answer_id}
            answer_id={a.answer_id}
            answerer_name={a.answerer_name}
            body={a.body}
            date={a.date}
            answer_helpfulness={a.helpfulness}
            photos={a.photos}
          />
        ))}
      </div>
    );

  return (
    <>
      {scrollAnswers}
      {linkDisplay}
    </>
  );
}

export default AnswerList;
