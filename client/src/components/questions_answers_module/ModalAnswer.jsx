/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';

import addAnswer from './helper_functions/addAnswer';
import FormInput from './FormInput.jsx';
import FormErrorList from './FormErrorList.jsx';
import convertToBase64url from './helper_functions/convertToBase64url';
import useClickOutside from './custom_hooks/useClickOutside.jsx';

const MAX_FILE_COUNT = 5;

function ModalAnswer({
  productName,
  question_id,
  showModal,
  questionBody,
  handleFetchAnswers,
}) {
  const [values, setValues] = useState({
    answer: '',
    nickname: '',
    email: '',
    photos: [],
  });
  const [validEntries, setValidEntries] = useState({
    answer: false,
    nickname: false,
    email: false,
    photos: true,
  });
  const [formError, setFormError] = useState(false);

  const inputs = [
    {
      id: 1,
      label: 'Your Answer',
      name: 'answer',
      type: null,
      maxLength: '1000',
      placeholder: null,
      message: null,
      errorMessage: 'please enter an answer',
      pattern: null,
      required: true,
    },
    {
      id: 2,
      label: 'What is your nickname',
      name: 'nickname',
      type: 'text',
      maxLength: '60',
      placeholder: 'Example: jack543!',
      message:
        'For privacy reasons, do not use your full name or email address',
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
      placeholder: 'Example: jack@email.com',
      message: 'For authentication reasons, you will not be emailed',
      errorMessage: 'please enter a valid email address',
      required: true,
    },
    {
      id: 4,
      label: 'Upload your photos',
      name: 'photos',
      type: 'file',
      accept: 'image/*',
      errorMessage: 'must upload a valid image',
      maxUploads: 5,
    },
  ];

  const handleUpload = (e) => {
    const { errorMessage } = inputs[3];

    convertToBase64url(e, errorMessage)
      .then((res) => {
        const copyArray = values.photos.slice();
        res.forEach((item) => {
          if (
            values.photos.indexOf(item) === -1 &&
            values.photos.length < MAX_FILE_COUNT
          ) {
            copyArray.push(item);
          }
        });
        const newObj = { ...values, photos: copyArray };
        setValues(newObj);
        setValidEntries({ ...validEntries, photos: true });
      })
      .catch((error) => {
        if (values.photos.length === 0) {
          setValidEntries({ ...validEntries, photos: false });
        }
      });
  };

  const validateForm = () => {
    const error = Object.values(validEntries).every((item) => !item);
    if (error) {
      setFormError(error);
    } else {
      setFormError(!error);
    }
  };

  const handleSubmit = () => {
    const { answer, nickname, email, photos } = values;
    addAnswer(question_id, answer, nickname, email, photos, handleFetchAnswers);
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
        <h1>Submit Your Answer</h1>
        <h2>
          {productName}: {questionBody}
        </h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            handleUpload={handleUpload}
          />
        ))}

        {displayError}
        <button id="submit-question-button" onClick={validateForm}>
          Submit Answer
        </button>
      </form>
    </div>
  );
}

export default ModalAnswer;
