const axios = require('axios');

async function getWidgets () {
  const overview = await document.querySelector('#main-container');
  const reviews = await document.querySelector('#reviews-body');
  const questions = await document.querySelector('#QandA-main');

  overview.onclick = function(e) {
    e.preventDefault();
    handleInteraction(e, 'Product Overview')
  }

  reviews.onclick = function(e) {
    e.preventDefault();
    handleInteraction(e, 'Ratings and Reviews')
  }

  questions.onclick = function(e) {
    e.preventDefault();
    handleInteraction(e, 'Questions and Answers')
  }
}


function handleInteraction (e, widget) {
  console.log('Here')
  const element = e.target.attributes[0].value;
  const time = new Date().toString().split(' ')[4];

  if (element && widget) {
    axios.post('/interactions', { element, widget, time })
      .then(response => {
        console.log(response.status, response.data);
      })
      .catch(error => {
        console.log('Error in click event listener: ', error);
      })
  }
};


// module.exports = {
//   handleInteraction,
// }



