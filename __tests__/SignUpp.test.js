import React from 'react';
import renderer from 'react-test-renderer';
import SignUpp from '../src/screens/SignUpp';

describe('Testing SignUpp', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SignUpp />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('should change the email value', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()

    loginComponent.handleEmailChange('some_email')

    expect(loginComponent.state.email).toEqual('some_email')
})

it('should change the password value', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()

    loginComponent.handlePasswordChange('some_password')

    expect(loginComponent.state.password).toEqual('some_password')
})


it('should change the confirmed password value', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()

    loginComponent.handleConPasswordChange('some_password')

    expect(loginComponent.state.confirmedPassword).toEqual('some_password')
})

it('should change the first name value', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()

    loginComponent.handleFirstNameChange('some_name')

    expect(loginComponent.state.first_Name).toEqual('some_name')
})

it('should change the last name value', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()

    loginComponent.handleLastNameChange('some_last')

    expect(loginComponent.state.last_Name).toEqual('some_last')
})

it('should check email', () => {
    let loginComponent = renderer.create(<SignUpp/>).getInstance()
    loginComponent.handleEmailChange('some_email')
    loginComponent.checkEmail()

    expect(loginComponent.checkEmail()).toBeTruthy()
})
