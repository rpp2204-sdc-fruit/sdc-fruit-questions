import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function useGetQuestions(
  product_id,
  setDisplayList,
  setShowMoreQuestions,
  fetchQuestions
) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const url = `/questions/${product_id}`;
    axios
      .get(url)
      .then((response) => {
        const grabFirstTwo = response.data.slice(0, 2);
        if (response.data.length > 2) {
          setShowMoreQuestions((prevState) => !prevState);
        }

        setDisplayList(grabFirstTwo);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchQuestions, product_id]);

  return questions;
}
