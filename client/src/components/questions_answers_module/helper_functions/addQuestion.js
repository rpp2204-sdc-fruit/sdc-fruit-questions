import axios from 'axios';

export default function addQuestion(
  product_id,
  body,
  name,
  email,
  handleFetchQuestions
) {
  const url = `/question`;

  const data = JSON.stringify({
    product_id,
    body,
    name,
    email,
  });
  console.log(data);
  const options = {
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios(options)
    .then(() => {
      handleFetchQuestions();
    })
    .catch((error) => {
      console.log(error);
    });
}
