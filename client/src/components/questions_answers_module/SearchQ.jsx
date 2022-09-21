import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchQ({ searchText, handleUpdateSearchText }) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input
          value={searchText}
          type="text"
          placeholder="Have a question? Search for answers..."
          onChange={handleUpdateSearchText}
        />
        <FontAwesomeIcon icon={faSearch} className="searchInputs" />
      </div>
      <div className="dataResult" />
    </div>
  );
}

export default SearchQ;
