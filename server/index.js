require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();
const compression = require('compression');
const history = require('connect-history-api-fallback');

const {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
  reportAnswer,
} = require('./utils/questionsAnswersHelper.js');
const { uploadToCloudinary } = require('./utils/uploadToCloudinary');
const { postInteractions } = require('./utils/postInteractions');
const { getProduct } = require('./utils/productDetails.js');
const reviewsHelpers = require('./utils/reviewsHelpers.js');

const { URL, TOKEN, PORT } = process.env;
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';


app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

app.use(history());
app.use(compression());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json({ limit: '10mb' }));

app.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

// *** Q & A *** //

// Question List;
app.get('/questions/:product_id/', getQuestions, (req, res) => {
  console.log('questions: ', res.body);
  res.status(200).send(res.body);
});

// Answer List;
app.get('/answers/:question_id/:page/:count', getAnswers, (req, res) => {
  res.status(200).send(res.body);
});

// Add Question
app.post('/question', addQuestion, (req, res) => {
  res.sendStatus(201);
});

// Add Answer
app.post('/answer/:question_id', uploadToCloudinary, addAnswer, (req, res) => {
  res.sendStatus(201);
});

// Mark Question As Helpful
app.put('/helpful/question/:question_id', markQuestionAsHelpful, (req, res) => {
  res.sendStatus(204);
});

// Mark Answer As Helpful
app.put('/helpful/answer/:answer_id', markAnswerAsHelpful, (req, res) => {
  res.sendStatus(204);
});

// Report Answer
app.put('/answer/:answer_id/report', reportAnswer, (req, res) => {
  res.sendStatus(204);
});

/////////////// Products //////////////////

app.get('/products', (req, res, next) => {
  // console.log(`Received a get request to get the prodcut information for product: ${req.params.id} and  url: ${req.url}`);

  axios
    .get(URL + req.url, {
      headers: {
        Authorization: process.env.GIT,
      },
    })
    .then((products) => {
      res.status(200).send(products.data);
    })
    .catch(next);
});

/////////////// OVERVIEW COMPONENT //////////////////////

app.get('/products/:id', (req, res, next) => {
  // console.log(`Received a get request to get the prodcut information for product: ${req.params.id} and  url: ${req.url}`);
  axios
    .get(url + req.url, {
      headers: {
        Authorization: process.env.GIT,
      },
    })
    .then((product_info) => {
      // console.log('This is the product info: ', product_info.data);
      res.send(product_info.data);
    })
    .catch(next);
});

app.get('/products/:id/styles', (req, res, next) => {
  axios
    .get(url + req.url, {
      headers: {
        Authorization: process.env.GIT,
      },
    })
    .then((product_styles) => {
      // console.log('These are the product styles: ', product_styles.data);
      res.send(product_styles.data);
    })
    .catch(next);
});

//*** RATINGS and REVIEWS ***//

// GET reviews
app.get('/reviews', (req, res) => {
  reviewsHelpers.getReviews(req.query, (error, reviews) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(reviews);
    }
  });
});

// POST new review
app.post('/reviews', uploadToCloudinary, (req, res) => {
  reviewsHelpers.postReview(req.body, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(201);
    }
  });
});

//GET review metadata
app.get('/reviews/meta', (req, res) => {
  reviewsHelpers.getMetaData(req.query, (error, metadata) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(metadata);
    }
  });
});

//PUT mark review helpful
app.put('/reviews/:review_id/helpful', (req, res) => {
  reviewsHelpers.markHelpful(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//PUT report review
app.put('/reviews/:review_id/report', (req, res) => {
  reviewsHelpers.reportReview(req.params, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.sendStatus(204);
    }
  });
});

//Reviews Wild Card
app.use('/reviews/*', (req, res) => {
  res.send('404: This page does not exist');
});

//POST interactions
app.post('/interactions', (req, res) => {
  postInteractions(req.body, (error) => {
    if (error) {
      res.sendStatus(422);
    } else {
      res.sendStatus(201);
    }
  });
});

app.use((err, req, res, next) => {
  console.log('error in express error handler: ', err.message);
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
