/* global document */
import React, { useEffect, useRef } from 'react';

const useClickOutside = (handler) => {
  const elementRef = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!elementRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return elementRef;
};
export default useClickOutside;
