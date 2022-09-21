import React, { useEffect, useRef } from 'react';

const useAutoScroll = (length) => {
  const elementRef = useRef(null);
  const prevLengthRef = useRef(length);
  const prevLength = prevLengthRef.current;
  useEffect(() => {
    prevLengthRef.current = length;
    if (prevLength < length) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  }, [length]);

  return elementRef;
};
export default useAutoScroll;
