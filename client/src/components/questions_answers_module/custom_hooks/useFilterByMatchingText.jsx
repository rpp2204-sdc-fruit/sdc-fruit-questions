import React from 'react';

export default function useFilterByMatchingText(list, text, property) {
  const filteredList = list.filter((item) =>
    item[property].toLowerCase().includes(text.toLowerCase())
  );

  return filteredList;
}
