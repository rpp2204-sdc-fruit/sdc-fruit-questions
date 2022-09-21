import React from 'react';
import axios from 'axios';
// ******************** Helper Functions ******************** //
const helpers = {
  handleFilters: (target, setCurrentFilters) => {
    const document = this;
    console.log(this);
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
    const ratingsData = Object.keys(currentRatings).map((key) => [
      parseInt(key, 10),
      parseInt(currentRatings[key], 10),
    ]);
    for (let i = 0; i < ratingsData.length; i++) {
      const key = ratingsData[i][0];
      const value = ratingsData[i][1];
      reviewsCount += value;
      sum += key * value;
    }
    // for (const rating in currentRatings) {
    //   if (rating) {
    //     const key = parseInt(rating, 10);
    //     const value = parseInt(currentRatings[rating], 10);
    //     reviewsCount += value;
    //     sum += key * value;
    //   }
    // }
    avg = (sum / reviewsCount).toFixed(1);
    cb(avg, reviewsCount);
  },
  handleRatingsPercent: (ratings) => {
    const currentRatings = ratings.current.ratings;
    let sum = 0;
    const percentKey = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (const rating in currentRatings) {
      sum += parseInt(currentRatings[rating]);
    }
    for (const rating in currentRatings) {
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
    starRatingDiv = [];
    const NUM_STARS = 5;
    const base = Math.floor(currentAverage);
    const remainder = currentAverage - base;
    let starFraction;
    if (remainder < 0.25) {
      starFraction = 'none';
    }
    if (remainder >= 0.25 && remainder < 0.5) {
      starFraction = 'quarter';
    }
    if (remainder >= 0.5 && remainder < 0.75) {
      starFraction = 'half';
    }
    if (remainder >= 0.75) {
      starFraction = 'three-quarter';
    }
    if (currentAverage !== 0) {
      for (let i = 1; i <= base; i++) {
        starRatingDiv.push(
          <>
            <i
              className="fak fa-star-solid star"
              fromelement="Ratings/Reviews"
              key={`${i}-solid`}
            />
          </>
        );
      }

      if (starFraction !== 'none') {
        starRatingDiv.push(
          <i
            className="fak fa-star-half-stroke-solid"
            fromelement="Ratings/Reviews"
            key="star-fraction"
          />
        );
      }
      const start = base + 1;
      for (let i = start; i < NUM_STARS; i++) {
        starRatingDiv.push(
          <i
            className="fak fa-star-thin star"
            fromelement="Ratings/Reviews"
            key={`${i}-regular`}
          />
        );
      }
    }
    return starRatingDiv;
  },
  createRatingsBD: (ratings, setCurrentFilters) => {
    const ratingsPercent = helpers.handleRatingsPercent(ratings);
    const currentRatings = ratings.current.ratings;
    let ratingsGraphDiv = [<div key="ratingsBD" />];
    if (currentRatings) {
      const NUM_BARS = 5;
      ratingsGraphDiv = [];
      for (let i = NUM_BARS; i > 0; i--) {
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
                style={{ width: `${ratingsPercent[i]}%` }}
              />
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
