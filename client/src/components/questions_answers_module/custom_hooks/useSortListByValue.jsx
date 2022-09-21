import React from 'react';

export default function useSortListByValue(list, targetProperty, value) {
  const filterTarget = [...list].filter(
    (item) => item[targetProperty] === value
  );
  const filterRest = [...list].filter((item) => item[targetProperty] !== value);

  const sorted = [...filterTarget, ...filterRest];

  return sorted;
}
