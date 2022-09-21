import React, { useState, useRef } from 'react';
import Review from './Review.jsx';

function ReviewsList({ reviews, setSortType, reviewCount }) {
  const [currentSort, setCurrentSort] = useState('relevance');

  const currentSortType = useRef('relevance');

  function handleSort(sort) {
    const sortType = sort === 'relevant' ? 'relevance' : sort;
    setCurrentSort(sortType);
    setSortType(sort);
  }

  return (
    <div id="reviews-list" fromelement="Ratings/Reviews">
      <div id="review-sort" fromelement="Ratings/Reviews">
        <div id="sort-text" fromelement="Ratings/Reviews">{`${reviewCount} reviews, sorted by`}</div>
        <div id="sort-dropdown" fromelement="Ratings/Reviews">
          {currentSort}
          <div id="sort-dropdown-content" fromelement="Ratings/Reviews">
            <ul className="review-sort-types" fromelement="Ratings/Reviews">
              <li className="relevant" fromelement="Ratings/Reviews" role="relevant" onClick={() => handleSort('relevant')}>
                relevance
              </li>
              <li className="newest" fromelement="Ratings/Reviews" role="newest" onClick={() => handleSort('newest')}>
                newest
              </li>
              <li className="helpful" fromelement="Ratings/Reviews" role="helpful" onClick={() => handleSort('helpful')} value="helpful">
                helpful
              </li>
            </ul>
          </div>
          <div id="sort-icon" fromelement="Ratings/Reviews">
            <i className="fa-regular fa-angle-down fa-lg" fromelement="Ratings/Reviews"></i>
          </div>
        </div>
      </div>

      <div id="reviews" fromelement="Ratings/Reviews">
        {reviews
          ? reviews.map((review) => (
              <Review
                key={review.review_id}
                review={review}
                helpfulness={review.helpfulness}
                recommend={review.recommend}
                response={review.response}
                review_id={review.review_id}
                username={review.reviewer_name}
                summary={review.summary}
                photos={review.photos}
                rating={review.rating}
                body={review.body}
                date={review.date}
              />
            ))
          : ''}
      </div>
    </div>
  );
}

export default ReviewsList;
