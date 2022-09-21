import React from 'react';

export default function Link({ to, component }) {
  const preventReload = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    const navigationEvent = new PopStateEvent('navigate');
    window.dispatchEvent(navigationEvent);
  };
  console.log(to);
  return (
    <a href={to} onClick={preventReload}>
      {component}
    </a>
  );
}
