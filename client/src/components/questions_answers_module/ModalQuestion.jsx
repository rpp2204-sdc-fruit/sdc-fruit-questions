/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import addQuestion from './helper_functions/addQuestion';
import FormInput from './FormInput.jsx';
import FormErrorList from './FormErrorList.jsx';
import useClickOutside from './custom_hooks/useClickOutside.jsx';

function ModalQuestion({
  productName,
  productId,
  showModal,
  handleFetchQuestions,
}) {
  const [values, setValues] = useState({
    question: '',
    nickname: '',
    email: '',
  });
  const [validEntries, setValidEntries] = useState({
    question: false,
    nickname: false,
    email: false,
  });
  const [formError, setFormError] = useState(false);

  const inputs = [
    {
      id: 1,
      label: 'Your Question',
      name: 'question',
      type: null,
      maxLength: '1000',
      placeholder: null,
      message: null,
      errorMessage: 'please enter a question',
      pattern: null,
      required: true,
    },
    {
      id: 2,
      label: 'What is your nickname',
      name: 'nickname',
      type: 'text',
      maxLength: '60',
      placeholder: 'Example: jackson11!',
      message: 'For privacy reasons, do not use your full name or email',
      errorMessage: 'please enter a nickname',
      pattern: null,
      required: true,
    },
    {
      id: 3,
      label: 'Your email',
      name: 'email',
      type: 'email',
      maxLength: '60',
      placeholder: 'Why did you like the product or not?',
      message: 'For authentication reasons, you will not be emailed',
      errorMessage: 'please enter a valid email address',
      required: true,
    },
  ];

  const validateForm = () => {
    const error = Object.values(validEntries).every((item) => !item);

    if (error) {
      setFormError(error);
    } else {
      setFormError(!error);
    }
  };

  const handleSubmit = (e) => {
    const { question, nickname, email } = values;
    addQuestion(productId, question, nickname, email, handleFetchQuestions);
    showModal();
  };

  const onChange = (e) => {
    const isValueValid = e.target.validity.valid;
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (isValueValid) {
      setValidEntries({
        ...validEntries,
        [targetName]: true,
      });
    } else {
      setValidEntries({
        ...validEntries,
        [targetName]: false,
      });
    }

    setValues({
      ...values,
      [targetName]: targetValue,
    });
  };

  const domNode = useClickOutside(() => {
    showModal();
  });

  let displayError;
  if (formError === true) {
    displayError = (
      <FormErrorList validEntries={validEntries} inputs={inputs} />
    );
  } else {
    displayError = null;
  }

  return (
    <div id="new-question-window">
      <form ref={domNode} id="question-form" onSubmit={handleSubmit}>
        <h1>Ask Your Question</h1>
        <h2>About the {productName}</h2>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        {displayError}
        <button id="submit-question-button" onClick={validateForm}>
          Submit question
        </button>
      </form>
    </div>
  );
}

export default ModalQuestion;
