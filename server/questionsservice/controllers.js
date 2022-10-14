const { ProductQuestion } = require('./db');

let lastQuestion_id;
let lastAnswer_id; //TO DO
ProductQuestion.find({}).sort({'questions.question_id':-1}).limit(1).exec((err, doc) => {
    const { questions } = doc[0];
    lastQuestion_id = questions[questions.length - 1].question_id;
  });
// ProductQuestion.find({}).sort({'questions.answers.answer_id':-1}).limit(1).exec((err, doc) => {
//     if (err) {
//       console.log('Error finding last answer:', err);
//     }
//     const { questions } = doc[0];
//     questions.forEach((question) => {
//       const { answers } = question;
//       console.log(answers);
//       // Object.keys(answers.toObject()).forEach((answer) => {
//       //   if (answer.answer_id > lastAnswer_id || lastAnswer_id === null) {
//       //     lastAnswer_id = answer.answer_id;
//       //   }
//       // });
//     });
//   });
module.exports = {
  getQuestions(product_id, page = 1, count = 5, cb) {
    const returnDoc = {
      product_id,
      results: [],
    };
    ProductQuestion.findById(Number(product_id), (err, doc) => {
      if (err) {
        console.log('Error retrieving from database:', err);
        cb(err);
      }
      const start = Number(page - 1) * Number(count);
      const end = Number(page - 1) * Number(count) + Number(count);
      for (let i = start; i < end; i++) {
        if (doc.questions[i] && !doc.questions[i].reported) {
          const returnQuestion = {
            question_id: doc.questions[i].question_id,
            question_body: doc.questions[i].question_body,
            question_date: doc.questions[i].question_date,
            asker_name: doc.questions[i].asker_name,
            question_helpfulness: doc.questions[i].question_helpfulness,
            reported: doc.questions[i].reported,
            answers: {},
          };
          doc.questions[i].answers.forEach((answer, answer_id) => {
            if (!answer.reported) {
              returnQuestion.answers[answer_id] = {
                id: answer.answer_id,
                body: answer.body,
                date: answer.date,
                answerer_name: answer.answerer_name,
                helpfulness: answer.helpfulness,
                photos: answer.photos,
              };
            }
          });
          returnDoc.results.push(returnQuestion);
        }
      }
      cb(null, returnDoc);
    });
  },
  getAnswers(question_id, page = 1, count = 5, cb) {
    const returnDoc = {
      question: question_id,
      page: Number(page),
      count: Number(count),
      results: [],
    };
    const filter = { 'questions.question_id': Number(question_id) };
    ProductQuestion.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error retrieving from database:', err);
        cb(err);
      }
      const start = Number(page - 1) * Number(count);
      const end = Number(page - 1) * Number(count) + Number(count);
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].question_id === Number(question_id)) {
          const answersSlice = Array.from(doc.questions[i].answers.values()).slice(start, end);
          answersSlice.forEach((answer) => {
            if (answer.answer_id && !answer.reported) {
              returnDoc.results.push({
                answer_id: answer.answer_id,
                body: answer.body,
                answerer_name: answer.answerer_name,
                photos: answer.photos,
                date: answer.date,
                helpfulness: answer.helpfulness,
              });
            }
          });
          break;
        }
      }
      cb(null, returnDoc);
    });
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
    ProductQuestion.findByIdAndUpdate(product_id, { $push: { questions: newQuestion } }, (err) => {
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
    const newAnswer_id = lastAnswer_id + 1; //TO DO
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
    const update = { [`answers.${newAnswer_id}`]: newAnswer };
    ProductQuestion.findOneAndUpdate(filter, update, (err) => {
      if (err) {
        console.log('Error writing to database', err);
        cb(err);
      }
      lastAnswer_id++;
      cb();
    });
  },
  markQuestionAsHelpful(question_id, cb) {
    const filter = { 'questions.question_id': Number(question_id) };
    ProductQuestion.findOne(filter, (err, doc) => {
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
    ProductQuestion.findOne(filter, (err, doc) => {
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
    ProductQuestion.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding answer in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].answers.get(answer_id) !== undefined) {
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
    ProductQuestion.findOne(filter, (err, doc) => {
      if (err) {
        console.log('Error finding answer in database', err);
        cb(err);
      }
      for (let i = 0; i < doc.questions.length; i++) {
        if (doc.questions[i].answers.get(answer_id) !== undefined) {
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
