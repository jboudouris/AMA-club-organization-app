import React from 'react';
import renderer from 'react-test-renderer';
import ForgetPassword from '../src/screens/ForgetPassword';
import { db } from '../src/config';

describe('Testing ForgetPassword View', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ForgetPassword />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('should change the email value', () => {
    let loginComponent = renderer.create(<ForgetPassword/>).getInstance()

    loginComponent.handleEmailChange('some_email')

    expect(loginComponent.state.email).toEqual('some_email')
})
