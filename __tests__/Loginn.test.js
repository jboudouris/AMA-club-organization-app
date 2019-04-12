import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Loginn from '../src/screens/Loginn';
import { db } from '../src/config';

describe('Testing Loginn', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Loginn />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('should change the password value', () => {
    let loginComponent = renderer.create(<Loginn/>).getInstance()

    loginComponent.handlePasswordChange('some_password')

    expect(loginComponent.state.password).toEqual('some_password')
})

it('should change the email value', () => {
    let loginComponent = renderer.create(<Loginn/>).getInstance()

    loginComponent.handleEmailChange('some_email')

    expect(loginComponent.state.email).toEqual('some_email')
})

it('should login user', () => {
    let loginComponent = renderer.create(<Loginn/>).getInstance()

      loginComponent.handlePasswordChange('123123')
      loginComponent.handleEmailChange('sly5@wisc.edu')
      loginComponent.handleLogin(loginComponent.state.email, loginComponent.state.password)
    expect(loginComponent.state.errorMessage).toBeNull()
})

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Loginn onClick={mockCallBack}>Ok!</Loginn>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
