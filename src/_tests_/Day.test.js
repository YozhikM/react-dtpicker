import React from 'react';
import Day from '../components/Calendar/Day/Day';
import renderer from 'react-test-renderer';

it ('renders correctly', () => {
  const tree = renderer.create(
    <Day date={new Date()}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
