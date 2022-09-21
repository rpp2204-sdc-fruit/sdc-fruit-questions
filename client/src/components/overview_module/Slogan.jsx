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

function Slogan(props) {
  if (Object.keys(props.product).length) {
    return (
      <div className="slogan-features">
        <div className="slogan">{props.product.slogan}</div>
        <ul className="features">
          {props.product.features.map((feature, index) => (
            <li key={index}>{`${feature.value} ${feature.feature}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Slogan;
