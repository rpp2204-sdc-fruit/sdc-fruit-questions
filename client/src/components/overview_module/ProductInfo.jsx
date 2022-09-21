/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-scroll';
import getAvgRating from './helper-functions/helper.js';
import findDefaultStyle from './helper-functions/findDefaultStyle.js';

function ProductInfo(props) {
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [styles, setStyles] = useState({});

  const [price, setPrice] = useState({ amount: '', discounted: false });

  const showPrice = (style) => {
    if (style.sale_price !== null) {
      setPrice({ amount: style.sale_price, discounted: true });
    } else {
      setPrice({ amount: style.original_price, discounted: false });
    }
    // console.log(
    //   `Just changed the price to: ${price.amount} and ${price.discounted}`
    // );
  };

  useEffect(() => {
    showPrice(selectedStyle);
  }, [selectedStyle]);

  // Make a request to get the reviews information, calculate avg, and set state

  useEffect(() => {
    axios
      .get('/reviews/meta', { params: { product_id: props.product.id } })
      .then((data) => {
        // console.log('The reviews meta data is: ', data.data.ratings);
        // console.log(`The avg rating is: ${getAvgRating(data.data.ratings)}`)
        setAvgRating(getAvgRating(data.data.ratings).avg);
        setTotalReviews(getAvgRating(data.data.ratings).reviewsCount);
      });
  }, []);

  useEffect(() => {
    // console.log(`You changed the selected style to ${props.style.name}`);
    setSelectedStyle(props.style);
  }, [props.style]);

  useEffect(() => {
    setStyles(props.styles.results);
  }, [props.styles]);

  // useEffect(() => {
  //   const selected = findDefaultStyle(styles);
  //   console.log(`The selected style is: ${selected}`);
  //   setSelectedStyle(selected);
  // }, [styles]);

  if (
    Object.keys(props.product).length &&
    avgRating !== null &&
    Object.keys(selectedStyle).length
  ) {
    return (
      <div className="product-info-container">
        <div className="product_info_reviews">
          <fieldset>
            {avgRating >= 1 ? (
              <FontAwesomeIcon id="star-1" icon={solid('star')} key="1" />
            ) : (
              <FontAwesomeIcon id="star-1" icon={regular('star')} key="1" />
            )}
            {avgRating >= 2 ? (
              <FontAwesomeIcon id="star-2" icon={solid('star')} key="2" />
            ) : (
              <FontAwesomeIcon id="star-2" icon={regular('star')} key="2" />
            )}
            {avgRating >= 3 ? (
              <FontAwesomeIcon id="star-3" icon={solid('star')} key="3" />
            ) : (
              <FontAwesomeIcon id="star-3" icon={regular('star')} key="3" />
            )}
            {avgRating >= 4 ? (
              <FontAwesomeIcon id="star-4" icon={solid('star')} key="4" />
            ) : (
              <FontAwesomeIcon id="star-4" icon={regular('star')} key="4" />
            )}
            {avgRating === 5 ? (
              <FontAwesomeIcon id="star-5" icon={solid('star')} key="5" />
            ) : (
              <FontAwesomeIcon id="star-5" icon={regular('star')} key="5" />
            )}
          </fieldset>
          <Link
            className="scroll-review"
            to="reviews-module"
            smooth
            duration={500}
          >
            Read all &#40;{totalReviews}&#41; reviews{' '}
          </Link>
        </div>
        <div>{props.product.category}</div>
        <h2>{props.product.name}</h2>
        <h4>{props.product.slogan}</h4>
        <div>{selectedStyle.name}</div>
        <div>
          {price.discounted ? (
            <div className="price-container">
              <div className="discounted-price">${price.amount}</div>
              <div className="original-price">
                ${selectedStyle.original_price}
              </div>
            </div>
          ) : (
            <div className="original-price">
              ${selectedStyle.original_price}
            </div>
          )}
        </div>
        {/* <div className="description">{props.product.description}</div> */}
        {/* <ul>
          {props.product.features.map((feature, index) => (
            <li key={index}>{`${feature.value} ${feature.feature}`}</li>
          ))}
        </ul> */}

        <button className="addto-outfit">Add to My Outfit</button>
      </div>
    );
  }
  return (
    <div>
      <div className="product_info_reviews">
        <div data-testid="star-rating">This product has 4 stars reviews</div>
        <button className="read-reviews">Read all reviews</button>
      </div>
      <button>Add to My Outfit</button>
    </div>
  );
}

export default ProductInfo;
