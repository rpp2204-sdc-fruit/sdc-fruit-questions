import React, { useEffect, useState } from 'react';

export default function Router({ path, component }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log('currentPath: ', currentPath);
  console.log('path: ', path);

  useEffect(() => {
    console.log('change path');
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('navigate', onLocationChange);

    return () => window.removeEventListener('navigate', onLocationChange);
  }, []);

  return currentPath === path ? component : null;
}
