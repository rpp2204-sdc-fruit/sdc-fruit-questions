import React, { useState, useEffect, useMemo, useRef } from 'react';
import PhotoModal from './PhotoModal.jsx';
import { helpers } from './helper_functions/review.js';

function Review(props) {
  const {
    helpfulness,
    review_id,
    date,
    username,
    summary,
    review,
    rating,
    body,
    response,
    recommend,
    photos,
  } = props;

  const [helpfulCount, setHelpfulCount] = useState(helpfulness);
  const [viewPhoto, setViewPhoto] = useState(false);

  const reviewResponse = useRef([<div key="response" />]);
  const photoURL = useRef('');

  const formatedDate = useMemo(() => {
    return helpers.formatDate(date);
  }, [date]);

  const photosDisplay = useMemo(() => {
    return helpers.createPhotosDiv(photos, photoURL, setViewPhoto);
  }, [photos]);

  const starRating = useMemo(() => {
    return helpers.createStarDiv(rating);
  }, [rating]);

  const helpful = useMemo(() => {
    return helpers.createHelpfulnessDiv(
      helpfulCount,
      setHelpfulCount,
      helpfulness,
      review_id
    );
  }, [helpfulCount]);

  const recommended = useMemo(() => {
    return helpers.createRecommendDiv(recommend);
  }, [recommend]);

  useEffect(() => {
    helpers.createResponseDiv(response, reviewResponse);
  }, [review_id]);

  return (
    <div className="review" data-testid="review">
      <div className="review-tile-top-bar">
        <div className="review-stars" fromelement="Ratings/Reviews">
          {starRating}
        </div>
        <div className="review-date" fromelement="Ratings/Reviews">
          {formatedDate}
        </div>
        <div
          className="review-username"
          fromelement="Ratings/Reviews"
        >{`${username},`}</div>
      </div>
      <div className="review-summary" fromelement="Ratings/Reviews">
        {summary}
      </div>
      <div className="review-body" fromelement="Ratings/Reviews">
        {body}
      </div>
      <div className="review-photos" fromelement="Ratings/Reviews">
        {photosDisplay}
      </div>
      <PhotoModal
        photoURL={photoURL.current}
        viewPhoto={viewPhoto}
        closePhotoModal={helpers.closePhotoModal}
        setViewPhoto={setViewPhoto}
      />
      {recommended}
      {reviewResponse.current}
      <div className="review-helpfulness" fromelement="Ratings/Reviews">
        {helpful}
      </div>
    </div>
  );
}

export default Review;
