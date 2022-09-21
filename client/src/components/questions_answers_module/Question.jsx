import React, { useState, useEffect } from 'react';
import AnswerList from './AnswerList.jsx';
import markQuestionAsHelpful from './helper_functions/markQuestionAsHelpful.js';
import getAnswers from './helper_functions/getAnswers.js';
import ModalAnswer from './ModalAnswer.jsx';

const RESULTS_PER_PAGE = 100;

function Question({ question_id, body, helpfulness, productName, productId }) {
  const [answerList, setAnswerList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [page, setPage] = useState(1);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);
  const [helpCount, setHelpCount] = useState(helpfulness);
  const [allowUserVote, setAllowUserVote] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [fetchAnswers, setFetchAnswers] = useState(false);
  const [displayAfterFetchCount, setDisplayAfterFetchCount] = useState(0);
  const answerListLength = answerList.length;

  useEffect(() => {
    getAnswers(
      question_id,
      page,
      RESULTS_PER_PAGE,
      setAnswerList,
      setPage,
      displayList,
      setDisplayList,
      setShowMoreAnswers,
      displayAfterFetchCount,
      setDisplayAfterFetchCount
    );
  }, [page, fetchAnswers]);

  const handleSeeMoreAnswers = () => {
    setDisplayList(answerList);
    setShowMoreAnswers(false);
  };

  const handleCollapseAnswers = () => {
    const sliceDisplayList = displayList.slice(0, 2);

    setDisplayList(sliceDisplayList);
    setShowMoreAnswers(true);
  };

  const showModal = () => {
    setIsModal(!isModal);
  };

  const incrementHelpCount = () => {
    markQuestionAsHelpful(question_id);
    setHelpCount((prevState) => prevState + 1);
    setAllowUserVote(true);
  };

  const handleFetchAnswers = () => {
    setPage(1);
    setDisplayAfterFetchCount((prevState) => prevState + 1);
    setFetchAnswers((prevState) => !prevState);
  };
  let userVote;
  if (allowUserVote) {
    userVote = <div className="question-yes">Yes({helpCount})</div>;
  } else {
    userVote = (
      <div className="question-yes" onClick={incrementHelpCount}>
        Yes({helpCount})
      </div>
    );
  }

  const modal = isModal ? (
    <ModalAnswer
      handleFetchAnswers={handleFetchAnswers}
      productName={productName}
      productId={productId}
      question_id={question_id}
      questionBody={body}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  return (
    <div>
      {modal}
      <div className="question">
        <div>
          <h3>Q:</h3>
          <h3>{body}</h3>
        </div>

        <div className="question-options">
          <div className="question-helpful">
            <div>Helpful?</div>
            {userVote}
          </div>
          <div
            data-testid="test-answer"
            className="question-add-answer"
            onClick={showModal}
          >
            Add Answer
          </div>
        </div>
      </div>
      <AnswerList
        answerListLength={answerListLength}
        displayList={displayList}
        showMoreAnswers={showMoreAnswers}
        handleSeeMoreAnswers={handleSeeMoreAnswers}
        handleCollapseAnswers={handleCollapseAnswers}
      />
    </div>
  );
}

export default Question;
