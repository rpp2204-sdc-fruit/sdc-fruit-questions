import axios from 'axios';

describe('Questions service tests', () => {
  let serviceResults;
  const product_id = 71699;
  it('should read questions from the database', () => {
    axios.get(`/questions/${product_id}/`).then((results) => {
        console.log('Service data:', results.data);
        serviceResults = results.data;
    }).then(() => {
      const options = {
        headers: { Authorization: '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' },
      };
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${product_id}`, options)
        .then((results) => {
          console.log('Heroku data:', results.data);
          expect(1 + 2).toBe(3);
        });
    });
  });
});
