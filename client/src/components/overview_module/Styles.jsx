/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import AddToCart from './AddToCart.jsx';
import Gallery from './Gallery.jsx';

function Styles(props) {
  const [selectedStyle, setSelectedStyle] = useState({});

  useEffect(() => {
    setSelectedStyle(props.style);
  }, []);

  useEffect(() => {
    setSelectedStyle(props.style);
    props.changeStyleSelected(props.style);
  }, [props.styles]);

  const handleSelect = (e) => {
    e.preventDefault();
    // console.log(JSON.parse(e.target.getAttribute('value')));
    setSelectedStyle(JSON.parse(e.target.getAttribute('value')));
    props.changeStyleSelected(JSON.parse(e.target.getAttribute('value')));
  };

  if (props.styles.length) {
    // console.log(`There are ${props.styles.length} styles`);
    return (
      <div className="gallery-styles-container">
        {/* <Gallery style={selectedStyle} /> */}
        <div className="right">
          {/* <h1 className="selected-product-name">{props.product.name}</h1>
          <h3 className="selected-product-slogan">{props.product.slogan}</h3>
          <h4 className="selected-style-name">{selectedStyle.name}</h4> */}
          <div
            data-testid="style-selector"
            className="product_overview_style_selector"
          >
            {props.styles.map((style, index) => {
              if (style.name === selectedStyle.name) {
                return (
                  <img
                    className="selected-style-thumbnail"
                    onClick={(e) => {
                      handleSelect(e);
                    }}
                    value={JSON.stringify(style)}
                    src={style.photos[0].thumbnail_url}
                    key={index}
                  />
                );
              }
              return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  className="style_thumbnail"
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                  value={JSON.stringify(style)}
                  src={style.photos[0].thumbnail_url}
                  key={index}
                />
              );
            })}
          </div>
          <AddToCart style={selectedStyle} />
        </div>
      </div>
    );
  }
}

export default Styles;
