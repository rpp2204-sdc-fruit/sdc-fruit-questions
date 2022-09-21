import React, { useState, useEffect } from 'react';

function FormErrorList({ validEntries, inputs }) {
  const errorList = inputs.map((input) => {
    if (validEntries[input.name] === false) {
      return <li key={input.id}>{input.errorMessage}</li>;
    }
    return null;
  });

  const allErrorCleared = Object.values(errorList).every(
    (item) => item === null
  );

  if (!allErrorCleared) {
    return (
      <div id="questions-answers-form-error">
        <label>You must enter the following:</label>
        <ol type="1">{errorList}</ol>
      </div>
    );
  }
}

export default FormErrorList;
