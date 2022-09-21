import React, { useState, useEffect, useRef } from 'react';
import Question from './Question.jsx';
import ModalQuestion from './ModalQuestion.jsx';
import useAutoScroll from './custom_hooks/useAutoScroll.jsx';

function QuestionList({
  displayList,
  productName,
  productId,
  showMoreQuestions,
  handleShowMoreQuestions,
  handleFetchQuestions,
}) {
  const [isModel, setIsModel] = useState(false);
  const containerRef = useAutoScroll(displayList.length);

  const showModal = () => {
    setIsModel(!isModel);
  };

  const model = isModel ? (
    <ModalQuestion
      handleFetchQuestions={handleFetchQuestions}
      productName={productName}
      productId={productId}
      showModal={() => {
        showModal();
      }}
    />
  ) : null;

  const showMoreQuestionsButton = showMoreQuestions ? (
    <button onClick={handleShowMoreQuestions}> More Answered Questions </button>
  ) : null;

  return (
    <>
      {model}
      <div data-testid="test-questions" ref={containerRef} id="question-list">
        {displayList.map((q) => (
          <Question
            productName={productName}
            productId={productId}
            key={q.question_id}
            question_id={q.question_id}
            body={q.question_body}
            helpfulness={q.question_helpfulness}
          />
        ))}
      </div>
      <div id="questions-buttons">
        {showMoreQuestionsButton}
        <button onClick={showModal}> Add Question + </button>
      </div>
    </>
  );
}

export default QuestionList;

// pass the state as props;
// map over the list of questions;
