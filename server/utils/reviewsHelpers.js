require('dotenv').config();
const axios = require('axios');

const { URL, TOKEN } = process.env;

const getReviews = (query, cb) => {
  const url = `${URL}/reviews`;

  const options = {
    method: 'get',
    url,
    headers: { Authorization: TOKEN },
    params: query,
  };

  axios(options)
    .then((response) => cb(null, response.data.results))
    .catch((error) => cb(error, null));
};

const getMetaData = (params, cb) => {
  const url = `${URL}/reviews/meta`;
  const options = {
    method: 'get',
    url,
    headers: { Authorization: TOKEN },
    params,
  };

  axios(options)
    .then((response) => cb(null, response.data))
    .catch((error) => cb(error, null));
};

const postReview = (reviewData, cb) => {
  const {
    body,
    name,
    email,
    product_id,
    rating,
    summary,
    recommend,
    photoUrls,
    characteristics,
  } = reviewData;

  const data = JSON.stringify({
    product_id,
    rating,
    summary,
    body,
    recommend,
    name,
    email,
    photos: photoUrls,
    characteristics,
  });

  const options = {
    method: 'post',
    url: `${URL}/reviews`,
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(options)
    .then((response) => cb(null, response.status))
    .catch((error) => cb(error, null));
};

const markHelpful = (params, cb) => {
  const url = `${URL}/reviews/${params.review_id}/helpful`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then((response) => cb(null, response.status))
    .catch((error) => cb(error, null));
};

const reportReview = (params, cb) => {
  const url = `${URL}/reviews/${params.review_id}/report`;

  const options = {
    method: 'put',
    url,
    headers: {
      Authorization: TOKEN,
    },
  };

  axios(options)
    .then((response) => cb(null, response.status))
    .catch((error) => cb(error, null));
};

module.exports = {
  getReviews,
  getMetaData,
  postReview,
  markHelpful,
  reportReview,
};
