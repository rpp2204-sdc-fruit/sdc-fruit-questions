import axios from 'axios';

const initialState = {
  reviewForm: {
    product_id: 0,
    recommend: null,
    characteristics: {},
    summary: '',
    photos: [],
    rating: 0,
    email: '',
    body: '',
    name: '',
  },
};

const helpers = {
  handleSubmit: (userInputs, setUserInputs) => {
    axios
      .post('/reviews', userInputs)
      .then((response) => {
        setUserInputs((prevState) => ({
          ...prevState,
          ...initialState.reviewForm,
        }));
        console.log(response);
      })
      .catch((error) => {
        console.log('post error: ', error);
      });
  },

  validateUserData: (
    error,
    userInputs,
    setUserInputs,
    setErrorModal,
    characteristics,
    setShowReviewModal
  ) => {
    const { rating, recommend, summary, body, photos, name, email } =
      userInputs;
    const characteristicsLength = Object.keys(
      userInputs.characteristics
    ).length;
    const charsLength = Object.keys(characteristics).length;

    const validationKey = {
      rating: rating !== 0,
      recommend: typeof recommend === 'boolean',
      characteristics: charsLength === characteristicsLength,
      summary: summary.length <= 60,
      body: body.length >= 50 && body.length <= 1000,
      photos: photos.length <= 5,
      name: 0 < name.length && name.length <= 60,
      email: 0 < email.length && email.length <= 60,
    };

    function validateEmail() {
      var validationExp = /\S+@\S+\.\S+/;
      const valid = validationExp.test(userInputs.email);
      validationKey.email = valid;
    }
    validateEmail();

    for (let input in validationKey) {
      if (!validationKey[input]) {
        error.current = input;
        setErrorModal((errorModal) => true);
        return;
      }
    }
    setShowReviewModal((prevState) => false);
    helpers.handleSubmit(userInputs, setUserInputs);
  },
};

export { initialState, helpers };
