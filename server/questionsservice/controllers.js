const { MongoDB } = require('./mongodb');
const { redisClient } = require('./redis');
const { filterQuestions, filterAnswers } = require('./utilities');

//FIRST CONSOLE LOGS LAST Q and LAST A ID'S, HELD IN MEMORY
let lastQuestion_id;
let lastAnswer_id;
MongoDB.find({}).sort({'questions.question_id':-1}).limit(1).exec((err, doc) => {
    const { questions } = doc[0];
    lastQuestion_id = questions[questions.length - 1].question_id;
    console.log('lastQuestion_id', lastQuestion_id);
  });
  MongoDB.find({}).sort({'questions.answers.answer_id':-1}).limit(1).exec((err, doc) => {
    if (err) {
      console.log('Error finding last answer:', err);
    }
    const { questions } = doc[0];
    questions.forEach((question) => {
      const { answers } = question;
      Array.from(answers.keys()).forEach((answer_id) => {
        if (Number(answer_id) > lastAnswer_id || lastAnswer_id === undefined) {
          lastAnswer_id = Number(answer_id);
        }
      });
    });
    console.log('lastAnswer_id', lastAnswer_id);
  });
//CONTROLLERS
module.exports = {
  getQuestions: async (product_id, page = 1, count = 5, cb) => {
    try {
      const cachedDoc = await redisClient.get(`product_id:${product_id}page:${page}`);
      if (cachedDoc) {
        cb(null, JSON.parse(cachedDoc));
      } else {
        MongoDB.findById(Number(product_id), (err, doc) => {
          if (err) {
            throw err;
          }
          if (doc) {
            const filteredDoc = filterQuestions(doc, Number(page), Number(count));
            redisClient.SETEX(
              `product_id:${product_id}page:${page}`,
              300, //Holds in cache for 5 min.
              JSON.stringify(filteredDoc)
            );
            cb(null, filteredDoc);
          } else {
            const returnDoc = {
              product_id,
              results: [],
            };
            redisClient.SETEX(
              `product_id:${product_id}page:${page}`,
              300, //Holds in cache for 5 min.
              JSON.stringify(returnDoc)
            );
            cb(null, returnDoc);
          }
        });
      }
    } catch (err) {
      console.log(err);
      cb(err);
    }
  },
  getAnswers: async (question_id, page = 1, count = 5, cb) => {
    try {
      const cachedDoc = await redisClient.get(`question_id:${question_id}page:${page}`);
      if (cachedDoc) {
        cb(null, JSON.parse(cachedDoc));
      } else {
        const filter = { 'questions.question_id': Number(question_id) };
        MongoDB.findOne(filter, (err, doc) => {
          if (err) {
            throw err;
          }
          if (doc) {
            const filteredDoc = filterAnswers(doc, question_id, Number(page), Number(count));
            redisClient.SETEX(
              `question_id:${question_id}page:${page}`,
              300, //Holds in cache for 5 min.
              JSON.stringify(filteredDoc)
            );
            cb(null, filteredDoc);
          } else {
            const returnDoc = {
              question: question_id,
              page: Number(page),
              count: Number(count),
              results: [],
            };
            redisClient.SETEX(
              `question_id:${question_id}page:${page}`,
              300, //Holds in cache for 5 min.
              JSON.stringify(returnDoc)
            );
            cb(null, returnDoc);
          }
        });
      }
    } catch (err) {
      console.log(err);
      cb(err);
    }
  },
  postQuestion(body, name, email, product_id, cb) {
    const newQuestion = {
      question_id: lastQuestion_id + 1,
      question_body: body,
      question_date: new Date().toString(),
      asker_name: name,
      asker_email: email,
      question_helpfulness: 0,
      reported: false,
      answers: {},
    };
    MongoDB.findByIdAndUpdate(product_id, { $push: { questions: newQuestion } }, (err, doc) => {
        if (err) {
          console.log('Error writing to database', err);
          cb(err);
        }
        lastQuestion_id++;
        cb();
      }
    );
  },
  postAnswer(question_id, body, name, email, photos, cb) {
    const newAnswer_id = lastAnswer_id + 1;
    const newAnswer = {
      answer_id: newAnswer_id,
      body,
      date: new Date().toString(),
      answerer_name: name,
      answerer_email: email,
      helpfulness: 0,
      reported: false,
      photos: [],
    };
    if (photos) {
      photos.forEach((url, photo_id) => {
        const newPhoto = {
          photo_id,
          url,
        };
        newAnswer.photos.push(newPhoto);
      });
    }
    const filter = { 'questions.question_id': Number(question_id) };
    MongoDB.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error writing to database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].question_id === Number(question_id)) {
          doc.questions[i].answers.set(newAnswer_id.toString(), newAnswer);
          doc.save()
            .then(() => {
              lastAnswer_id++;
              cb(null, doc);
            })
            .catch((saveErr) => {
              console.log('Error saving to database', saveErr);
              cb(saveErr);
            });
        }
      }
    });
  },
  markQuestionAsHelpful(question_id, cb) {
    const filter = { 'questions.question_id': Number(question_id) };
    MongoDB.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding question in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].question_id === Number(question_id)) {
          doc.questions[i].question_helpfulness += 1;
          doc.save()
            .then(() => {
              cb(null, doc);
            })
            .catch((saveErr) => {
              console.log('Error saving to database', saveErr);
              cb(saveErr);
            });
        }
      }
    });
  },
  reportQuestion(question_id, cb) {
    const filter = { 'questions.question_id': Number(question_id) };
    MongoDB.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding question in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].question_id === Number(question_id)) {
          doc.questions[i].reported = true;
          doc.save()
            .then(() => {
              cb(null, doc);
            })
            .catch((saveErr) => {
              console.log('Error saving to database', saveErr);
              cb(saveErr);
            });
        }
      }
    });
  },
  markAnswerAsHelpful(answer_id, cb) {
    const filter = { [`questions.answers.${answer_id}`]: { $exists: true } };
    MongoDB.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding answer in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].answers && doc.questions[i].answers.get(answer_id) !== undefined) {
          const retrievedAnswer = doc.questions[i].answers.get(answer_id);
          retrievedAnswer.helpfulness += 1;
          doc.questions[i].answers.set(answer_id, retrievedAnswer);
          doc.save()
            .then(() => {
              cb(null, doc);
            })
            .catch((saveErr) => {
              console.log('Error saving to database', saveErr);
              cb(saveErr);
            });
        }
      }
    });
  },
  reportAnswer(answer_id, cb) {
    const filter = { [`questions.answers.${answer_id}`]: { $exists: true } };
    MongoDB.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding answer in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].answers && doc.questions[i].answers.get(answer_id) !== undefined) {
          const retrievedAnswer = doc.questions[i].answers.get(answer_id);
          retrievedAnswer.reported = true;
          doc.questions[i].answers.set(answer_id, retrievedAnswer);
          doc.save()
            .then(() => {
              cb(null, doc);
            })
            .catch((saveErr) => {
              console.log('Error saving to database', saveErr);
              cb(saveErr);
            });
        }
      }
    });
  },
};
