/* eslint-disable import/prefer-default-export */
// src/mocks/handlers.js
import { rest } from 'msw';
import { mockQuestions, answers_642599 } from './Q&A-mock-data.js';
import { mockProduct, mockStyles } from './Overview-mock-data.js';
import { mockReviews, mockMetadata } from './Reviews-mock-data.js';

export const handlers = [
  // Handles a GET /user request
  rest.get('questions/:product_id', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockQuestions.questions))
  ),
  rest.get('/answers/:question_id/:page/:count', (req, res, ctx) => {
    const { question_id, page } = req.params;

    if (question_id === 642599 && page === 1) {
      return res(ctx.status(200), ctx.json(answers_642599));
    }
    if (question_id === 642599 && page === 2) {
      return res(
        ctx.status(200),
        ctx.json({ question: '642599', page: '2', count: '100', results: [] })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ question: '642681', page: '1', count: '100', results: [] })
    );
  }),

  // Overview mock server responses

  rest.get('products/:product_id', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockProduct))
  ),

  rest.get('products/:product_id/styles', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockStyles))
  ),



  // Reviews mock server responses
  rest.get('/reviews', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockReviews))
  }),

  rest.get('/reviews/meta', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockMetadata))
  }),

  rest.post('/reviews/meta', (req, res, ctx) => {
    return res(ctx.status(201))
  }),

  rest.put('/reviews/:review_id/helpful', (req, res, ctx) => {
    return res(ctx.status(204))
  }),

  rest.put('/reviews/:review_id/report', (req, res, ctx) => {
    return res(ctx.status(204))
  }),

];
