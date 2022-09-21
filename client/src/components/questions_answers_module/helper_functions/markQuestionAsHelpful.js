import axios from 'axios';

export default function markQuestionAsHelpful(question_id) {
  const url = `helpful/question/${question_id}`;

  const options = {
    method: 'put',
    url,
  };

  axios(options)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}
