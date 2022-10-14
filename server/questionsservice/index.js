const express = require('express');
const {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  reportQuestion,
  reportAnswer,
  markQuestionAsHelpful,
  markAnswerAsHelpful,
} = require('./controllers.js');

const questionsService = express();
questionsService.use(express.json());

questionsService.use('/', (req, res, next) => {
  console.log(`${req.method} REQUEST ON ${req.url}`);
  next();
});

// GET Question List
questionsService.get('/questions', (req, res) => {
  const { product_id, page, count } = req.query;
  getQuestions(product_id, page, count, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

// GET Answer List
questionsService.get('/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const { page, count } = req.query;
  getAnswers(question_id, page, count, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

// POST Question
questionsService.post('/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;
  postQuestion(body, name, email, product_id, (err) => {
    if (err) {
      res.status(500);
    }
    res.status(201);
  });
});

// POST Answer
questionsService.post('/questions/:question_id/answers', (req, res) => {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;
  postAnswer(question_id, body, name, email, photos, (err) => {
    if (err) {
      res.status(500);
    }
    res.status(201);
  });
});

// PUT Mark Question As Helpful
questionsService.put('/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;
  markQuestionAsHelpful(question_id, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

// PUT Report Question
questionsService.put('/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params;
  reportQuestion(question_id, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

// PUT Mark Answer As Helpful
questionsService.put('/answers/:answer_id/helpful', (req, res) => {
  const { answer_id } = req.params;
  markAnswerAsHelpful(answer_id, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

// PUT Report Answer
questionsService.put('/answers/:answer_id/report', (req, res) => {
  const { answer_id } = req.params;
  reportAnswer(answer_id, (err, doc) => {
    if (err) {
      res.status(500);
    }
    res.status(200).send(doc);
  });
});

const port = 3002;

questionsService.listen(port, () => {
  console.log(`Questions Service listening on ${port}`);
});
