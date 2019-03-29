import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/screens/Profile';

describe('Testing Profile', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Profile />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
