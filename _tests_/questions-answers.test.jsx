import React from 'react';
import {
  fireEvent,
  render,
  screen,
  container,
  waitFor,
  act,
} from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import QandAModule from '../client/src/components/questions_answers_module/QandAModule.jsx';
import Question from '../client/src/components/questions_answers_module/Question.jsx';
import Answer from '../client/src/components/questions_answers_module/Answer.jsx';
import SearchQ from '../client/src/components/questions_answers_module/SearchQ.jsx';
import ModalAnswer from '../client/src/components/questions_answers_module/ModalAnswer.jsx';
import ModalQuestion from '../client/src/components/questions_answers_module/ModalQuestion.jsx';
import AnswerList from '../client/src/components/questions_answers_module/AnswerList.jsx';

describe('Questions and Answers renders correctly', () => {
  describe('QandAModule', () => {
    test('Questions & Answers heading is displayed', () => {
      render(<QandAModule />);
      const element = screen.getByRole('heading', {
        hidden: true,
        name: /questions & answers/i,
      });

      expect(element).toBeInTheDocument();
    });

    test('should show the 4th question when "More answered Questions" button is clicked and two more questions are rendered', async () => {
      render(<QandAModule product_id={71697} product_name="Heir Force Ones" />);

      const buttonElement = await screen.findByRole('button', {
        name: /more answered questions/i,
      });

      await fireEvent.click(buttonElement);

      await waitFor(() => {
        const lastQuestion = screen.getByRole('heading', {
          name: /the best question ever!/i,
        });
        expect(lastQuestion).toBeInTheDocument();
      });
    });

    test('clicking on "Add Question +" button renders question form modal', async () => {
      render(<QandAModule product_id={71697} product_name="Heir Force Ones" />);

      const buttonElement = await screen.findByRole('button', {
        name: /add question \+/i,
      });

      await fireEvent.click(buttonElement);

      await waitFor(() => {
        const questionModal = screen.getByRole('heading', {
          name: /ask your question/i,
        });

        expect(questionModal).toBeInTheDocument();
      });
    });

    // test('clicking on "Add Answer" renders answer form modal', async () => {
    //   render(<QandAModule product_id={71697} product_name="Heir Force Ones" />);

    //   const div = await screen.findByText(/add answer/i);

    //   await fireEvent.click(div);

    //   await waitFor(() => {
    //     const questionModal = screen.getByRole('heading', {
    //       name: /ask your question/i,
    //     });

    //     expect(questionModal).toBeInTheDocument();
    //   });
    // });

    test(`Should display a 'More Answered Questions' button when there are more than 2 questions`, async () => {
      render(<QandAModule product_id={71697} product_name="Heir Force Ones" />);

      await waitFor(() => {
        const element = screen.getByRole('button', {
          name: /more answered questions/i,
        });

        expect(element).toBeInTheDocument();
      });
    });

    test(`Should display a 'Add Question +' button`, () => {
      render(<QandAModule />);
      const element = screen.getByRole('button', {
        name: /add question \+/i,
      });

      expect(element).toBeInTheDocument();
    });
  });

  describe('Question', () => {
    test(`Should display a 'Helpful?' option`, () => {
      render(<Question />);
      const element = screen.getByText(/helpful\?/i);

      expect(element).toBeInTheDocument();
    });

    test(`Should display a 'Add Question +' button`, () => {
      render(<Question />);
      const element = screen.getByText(/add answer/i);

      expect(element).toBeInTheDocument();
    });

    //   test(`Should display the first answer from a list of answers for a given question id after the question is rendered`, async () => {
    //     await act(async () =>
    //       render(
    //         <Question
    //           question_id={642599}
    //           body="I wodner how...\nI just do..."
    //           helpfulness={78}
    //           productName="Heir Force Ones"
    //           productId={71697}
    //         />
    //       )
    //     );

    //     const answer = await screen.findByText(/hello/i);

    //     await waitFor(() => {
    //       expect(answer).toBeInTheDocument();
    //     });
    //   });
  });

  describe('Answer', () => {
    test(`Should display a 'Helpful?' option`, () => {
      render(
        <Answer
          answer_id={5987966}
          body="hello"
          date="2022-09-03T00:00:00.000Z"
          answerer_name="laalala"
          helpfulness={2}
          photos={[
            {
              id: 5341900,
              url: 'http://res.cloudinary.com/red-bean-rulez/image/upload/v1662232361/FEC_project/pvdebv0fdbliamrwpcls.jpg',
            },
          ]}
        />
      );

      const element = screen.getByText(/helpful\?/i);

      expect(element).toBeInTheDocument();
    });
  });

  describe('SearchQ', () => {
    test(`Search bar should display placeholder "Have a question? Search for answers..."`, () => {
      render(<SearchQ />);
      const element = screen.getByPlaceholderText(
        /have a question\? search for answers\.\.\./i
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe('ModalQuestion', () => {
    test(`Should display a 'Ask Your Question' heading`, () => {
      render(<ModalQuestion />);
      const element = screen.getByRole('heading', {
        name: /ask your question/i,
      });
      expect(element).toBeInTheDocument();
    });

    test(`should display a 'What is your nickname' label`, () => {
      render(<ModalQuestion />);
      const element = screen.getByText(/What is your nickname/i);

      expect(element).toBeInTheDocument();
    });
  });

  describe('ModalAnswer', () => {
    test(`Should display a 'Submit your Answer' heading`, () => {
      render(<ModalAnswer />);
      const element = screen.getByRole('heading', {
        name: /submit your answer/i,
      });
      expect(element).toBeInTheDocument();
    });

    test(`should display a 'What is your nickname' label`, () => {
      render(<ModalAnswer />);
      const element = screen.getByText(/What is your nickname/i);

      expect(element).toBeInTheDocument();
    });
  });
});
