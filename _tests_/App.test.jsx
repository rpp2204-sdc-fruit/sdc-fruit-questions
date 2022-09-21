/* global it, expect */

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App';

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
