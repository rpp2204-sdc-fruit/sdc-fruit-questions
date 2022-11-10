module.exports = {
  filterQuestions(doc, page, count) {
    const { _id } = doc;
    const returnDoc = {
      product_id: _id,
      results: [],
    };
    const start = (page - 1) * count;
    const end = (page - 1) * count + count;
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
        if (doc.questions[i].answers) {
          Array.from(doc.questions[i].answers.values()).forEach((answer) => {
            if (!answer.reported) {
              returnQuestion.answers[answer.answer_id] = {
                id: answer.answer_id,
                body: answer.body,
                date: answer.date,
                answerer_name: answer.answerer_name,
                helpfulness: answer.helpfulness,
                photos: answer.photos,
              };
            }
          });
        }
        returnDoc.results.push(returnQuestion);
      }
    }
    return returnDoc;
  },
  filterAnswers(doc, question_id, page, count) {
    const returnDoc = {
      question: question_id,
      page,
      count,
      results: [],
    };
    const start = (page - 1) * count;
    const end = (page - 1) * count + count;
    for (let i = 0; i < doc.questions.length; i++) {
      if (
        doc.questions[i].question_id === Number(question_id) &&
        doc.questions[i].answers
      ) {
        const answersSlice = Array.from(
          doc.questions[i].answers.values()
        ).slice(start, end);
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
    return returnDoc;
  },
};
