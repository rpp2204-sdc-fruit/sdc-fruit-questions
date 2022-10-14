const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/sdc');
const con = mongoose.connection;
con.on('connected', () => {
  console.log('MongoDB connected!');
});
con.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productQuestionSchema = new Schema(
  {
    _id: { type: Number, require: true },
    questions: [
      {
        question_id: { type: Number, require: true },
        question_body: { type: String, require: true },
        question_date: { type: Date, require: true },
        asker_name: { type: String, require: true },
        asker_email: { type: String, require: true },
        reported: { type: Boolean, require: true },
        question_helpfulness: { type: Number, require: true },
        answers: {
          type: Map,
          of: {
            answer_id: { type: Number },
            body: { type: String },
            date: { type: Date },
            answerer_name: { type: String },
            answerer_email: { type: String },
            reported: { type: Boolean },
            helpfulness: { type: Number },
            photos: [
              {
                photo_id: { type: Number },
                url: { type: String },
              },
            ],
          },
        },
      },
    ],
  },
  { strict: false }
);

const ProductQuestion = mongoose.model('ProductQuestion', productQuestionSchema, 'productquestions');

module.exports.ProductQuestion = ProductQuestion;
