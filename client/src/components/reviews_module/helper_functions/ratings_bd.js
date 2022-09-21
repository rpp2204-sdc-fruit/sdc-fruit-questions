import axios from 'axios';

// ******************** Helper Functions ******************** //

const helpers = {
  handleFilters: (target, setCurrentFilters) => {
    const className = target.className;
    const rating = target.dataset.id;
    const id = target.id;

    if (className === 'graph-text') {
      const element = document.getElementById(id);
      element.classList.add('graph-text-filter');
    } else {
      const element = document.getElementById(id);
      element.classList.remove('graph-text-filter');
    }

    setCurrentFilters((currentFilters) => ({
      ...currentFilters,
      [rating]: !currentFilters[rating],
    }));
  },

  handleRatings: (ratings, cb) => {
    const currentRatings = ratings;

    let reviewsCount = 0;
    let sum = 0;
    let avg = 0;

    for (const rating in currentRatings) {
      const key = parseInt(rating, 10);
      const value = parseInt(currentRatings[rating], 10);

      reviewsCount += value;
      sum += key * value;
    }

    avg = (sum / reviewsCount).toFixed(1);

    cb(avg, reviewsCount);
  },

  handleRatingsPercent: (ratings) => {
    const currentRatings = ratings.current.ratings;

    let sum = 0;

    let percentKey = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (let rating in currentRatings) {
      sum += parseInt(currentRatings[rating]);
    }

    for (let rating in currentRatings) {
      const value = currentRatings[rating];
      percentKey[rating] = Math.floor((value / sum) * 100);
    }
    return percentKey;
  },

  handleRecommended: (recommended, setPercentRecommended) => {
    if (recommended !== undefined) {
      const noCount = recommended.false;
      const yesCount = recommended.true;
      const totalCount = noCount + yesCount;
      const avg = Math.floor((yesCount / totalCount) * 100);

      setPercentRecommended(avg);
    }
  },

  createStarsRating: (avg) => {
    const currentAverage = avg.current;
    let starRatingDiv = [<div key="star-rating" />];

    if (currentAverage) {
      starRatingDiv = [];
      const NUM_STARS = 5;

      const base = Math.floor(currentAverage);
      const remainder = currentAverage - base;
      let starFraction;

      if (remainder < 0.25) {
        starFraction = 'none';
      }
      if (0.25 <= remainder && remainder < 0.5) {
        starFraction = 'quarter';
      }
      if (0.5 <= remainder && remainder < 0.75) {
        starFraction = 'half';
      }
      if (0.75 <= remainder) {
        starFraction = 'three-quarter';
      }

      if (currentAverage !== 0) {
        for (let i = 1; i <= base; i++) {
          starRatingDiv.push(
            <i
              className="fak fa-star-solid star"
              fromelement="Ratings/Reviews"
              key={`${i}-solid`}
            ></i>
          );
        }

        if (starFraction !== 'none') {
          starRatingDiv.push(
            <i
              className="fak fa-star-half-stroke-solid"
              fromelement="Ratings/Reviews"
              key="star-fraction"
            ></i>
          );
        }

        const start = base + 1;

        for (let i = start; i < NUM_STARS; i++) {
          starRatingDiv.push(
            <i
              className="fak fa-star-thin star"
              fromelement="Ratings/Reviews"
              key={`${i}-regular`}
            ></i>
          );
        }
      }
      return starRatingDiv;
    }
  },

  createRatingsBD: (ratings, setCurrentFilters) => {
    const ratingsPercent = helpers.handleRatingsPercent(ratings);
    const currentRatings = ratings.current.ratings;
    let ratingsGraphDiv = [<div key="ratingsBD" />];

    if (currentRatings) {
      const NUM_BARS = 5;
      ratingsGraphDiv = [];

      for (var i = NUM_BARS; i > 0; i--) {
        ratingsGraphDiv.push(
          <div id="filter-star" fromelement="Ratings/Reviews" key={i}>
            <div
              id={`filter-star-${i}`}
              fromelement="Ratings/Reviews"
              className="graph-text"
              data-id={`${i}`}
              onClick={(e) =>
                helpers.handleFilters(e.target, setCurrentFilters)
              }
            >
              {`${i} stars`}
            </div>
            <div className="graph-meter" fromelement="Ratings/Reviews">
              <span
                className="brekdown-meter"
                fromelement="Ratings/Reviews"
                style={{ width: ratingsPercent[i] + '%' }}
              ></span>
            </div>
            <div className="graph-rating" fromelement="Ratings/Reviews">
              {currentRatings[i]}
            </div>
          </div>
        );
      }
      return ratingsGraphDiv;
    }

    return ratingsGraphDiv;
  },

  getMetadata: (product_id, cb) => {
    const options = {
      params: { product_id },
    };

    axios
      .get('/reviews/meta', options)
      .then((meta) => {
        cb(meta.data);
      })
      .catch((err) => console.log('Error fetching metadata: ', err));
  },
};

export default helpers;
