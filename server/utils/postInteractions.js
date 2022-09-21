require('dotenv').config();
const axios = require('axios');
const { URL, TOKEN } = process.env;

function postInteractions (interactionData, cb) {

  const { element, widget, time } = interactionData;

  const data = JSON.stringify({
    element,
    widget,
    time
  });

  const options = {
    method: 'post',
    url: `${URL}/interactions`,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then(response => cb(null, response))
    .catch(error => cb(error, null))
}

module.exports = {
  postInteractions,
}