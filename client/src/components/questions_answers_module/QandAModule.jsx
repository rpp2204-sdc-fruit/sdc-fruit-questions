import React, { useState, useEffect } from 'react';
import SearchQ from './SearchQ.jsx';
import QuestionList from './QuestionList.jsx';
import useGetQuestions from './custom_hooks/useGetQuestions.jsx';
import useDebounce from './custom_hooks/useDebounce.jsx';
import useFilterByMatchingText from './custom_hooks/useFilterByMatchingText.jsx';

function QandAModule({ product_id, product_name }) {
  // display state
  const [displayList, setDisplayList] = useState([]);
  const [countShown, setCountShown] = useState(2);
  const [showMoreQuestions, setShowMoreQuestions] = useState(false);
  const [fetchQuestions, setFetchQuestions] = useState(false);

  useEffect(() => {
    setDisplayList([]);
    setCountShown(2);
    setShowMoreQuestions(false);
    setFetchQuestions(false);
  }, [product_id]);

  const questionList = useGetQuestions(
    product_id,
    setDisplayList,
    setShowMoreQuestions,
    fetchQuestions
  );

  //filtered questions state
  const [displayFiltered, setDisplayFiltered] = useState([]);
  const [filterCountShown, setFilterCountShown] = useState(2);
  const [showMoreFilteredQuestions, setShowMoreFilteredQuestions] =
    useState(false);

  //search text state
  const [searchText, setSearchText] = useState('');
  const [filterMode, setFilterMode] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 1500);

  const filteredList = useFilterByMatchingText(
    questionList,
    searchText,
    'question_body'
  );

  //as we incement count, also increment questions to display by two
  useEffect(() => {
    if (countShown < questionList.length) {
      let newList;
      if (countShown === 2) {
        newList = displayList;
      } else {
        const grabNextTwo = questionList.slice(countShown - 2, countShown);
        newList = [...displayList, ...grabNextTwo];
      }

      setDisplayList(newList);
      setShowMoreQuestions(true);
    } else {
      setDisplayList(questionList);
      setShowMoreQuestions(false);
    }
  }, [countShown]);

  //as we increment filtered count, also increment filtered questions to display by two
  useEffect(() => {
    if (displayFiltered.length !== filterCountShown) {
      if (filterCountShown < filteredList.length) {
        let newList;
        if (filterCountShown === 2) {
          newList = displayFiltered;
        } else {
          const grabNextTwo = filteredList.slice(
            filterCountShown - 2,
            filterCountShown
          );
          newList = [...displayFiltered, ...grabNextTwo];
        }

        setDisplayFiltered(newList);
        setShowMoreFilteredQuestions(true);
      } else {
        setDisplayFiltered(filteredList);
        setShowMoreFilteredQuestions(false);
      }
    }
  }, [filterCountShown]);

  // handle searching, want to only display first two questions
  useEffect(() => {
    if (debouncedSearchText.length >= 3) {
      const grabFirstTwo = filteredList.slice(0, 2);

      if (filterCountShown < filteredList.length) {
        setShowMoreFilteredQuestions(true);
      } else {
        setShowMoreFilteredQuestions(false);
      }
      setFilterMode(true);
      setCountShown(2);
      setFilterCountShown(2);
      setDisplayFiltered(grabFirstTwo);
    } else {
      const grabFirstTwo = questionList.slice(0, 2);

      setFilterMode(false);
      setFilterCountShown(2);
      setDisplayList(grabFirstTwo);
    }
  }, [debouncedSearchText]);

  const handleUpdateSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleShowMoreQuestions = () => {
    setCountShown((prevState) => prevState + 2);
  };

  const handleShowMoreFilteredQuestions = () => {
    setFilterCountShown((prevState) => prevState + 2);
  };

  const handleFetchQuestions = () => {
    setFetchQuestions((prevState) => !prevState);
    setShowMoreQuestions(false);
  };

  const list = filterMode ? (
    <QuestionList
      handleFetchQuestions={handleFetchQuestions}
      displayList={displayFiltered}
      productName={product_name}
      productId={product_id}
      showMoreQuestions={showMoreFilteredQuestions}
      handleShowMoreQuestions={handleShowMoreFilteredQuestions}
    />
  ) : (
    <QuestionList
      handleFetchQuestions={handleFetchQuestions}
      displayList={displayList}
      productName={product_name}
      productId={product_id}
      showMoreQuestions={showMoreQuestions}
      handleShowMoreQuestions={handleShowMoreQuestions}
    />
  );

  return (
    <div id="QandA-main">
      <div id="QandAtop">
        <h1 id="qanda-header">Questions & Answers</h1>
        <SearchQ
          handleUpdateSearchText={handleUpdateSearchText}
          searchText={searchText}
        />
        {list}
      </div>
    </div>
  );
}

export default QandAModule;
