import axios from 'axios';
import _ from 'lodash';
import useSortListByValue from '../custom_hooks/useSortListByValue.jsx';

export default function getAnswers(
  questionId,
  page,
  count,
  setAnswerList,
  setPage,
  displayList,
  setDisplayList,
  setShowMoreAnswers,
  displayAfterFetchCount,
  setDisplayAfterFetchCount
) {
  const url = `/answers/${questionId}/${page}/${count}`;

  axios
    .get(url)
    .then((response) => {
      const answerList = useSortListByValue(
        response.data.results,
        'answerer_name',
        'Seller'
      );

      //remove duplicates, sort by helpfullness, and sort by answerer name last
      setAnswerList((prevState) => {
        const removedDub = _.unionBy(answerList, prevState, 'answer_id');

        const sortByHelpfullNess = removedDub.sort(
          (a, b) => b.helpfulness - a.helpfulness
        );

        const result = useSortListByValue(
          sortByHelpfullNess,
          'answerer_name',
          'Seller'
        );

        if (displayAfterFetchCount > 0) {
          setDisplayAfterFetchCount((preState) => preState - 1);
          setShowMoreAnswers(false);

          // const grabAllWithNew = result.slice(0, result.length - 1);
          setDisplayList(result);
          return result;
        }

        // if the entire list is not empty and display list is empty;
        //set display list to first two
        if (result.length > 0 && displayList.length === 0) {
          const grabFirstTwo = result.slice(0, 2);
          setDisplayList(grabFirstTwo);
        }

        if (displayList.length === 2 && result.length > 2) {
          // if display list is 2 and there are more than 2 answers in entire list
          // we will show the see more answers link;
          setShowMoreAnswers(true);
        }

        return result;
      });

      if (answerList.length > 0) {
        setPage((prevstate) => prevstate + 1);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
