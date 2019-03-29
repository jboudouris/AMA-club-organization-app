import React from 'react';
import renderer from 'react-test-renderer';
import ProfileEdit from '../src/screens/ProfileEdit';

describe('Testing ProfileEdit', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ProfileEdit />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it('should change the first name value', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handleFirstNameChange('some_name')
    expect(loginComponent.state.first_Name).toEqual('some_name')
})

it('should change the last name value', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handleLastNameChange('some_last')
    expect(loginComponent.state.last_Name).toEqual('some_last')
})

it('should check alternate email', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handleAltEmailChange('some_email')
    expect(loginComponent.state.alt_Email).toEqual('some_email')
})

it('should check phone number', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handlePhoneNumberChange('1234567890')
    expect(loginComponent.state.phone_Number).toEqual('1234567890')
})

it('should check payment', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handlePaymentChange('420')
    expect(loginComponent.state.phone_Number).toEqual('420')
})

it('should check status', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handleRoleChange('exec')
    expect(loginComponent.state.phone_Number).toEqual('exec')
})

it('should check quote', () => {
    let loginComponent = renderer.create(<ProfileEdit/>).getInstance()
    loginComponent.handleQuoteChange('wow')
    expect(loginComponent.state.phone_Number).toEqual('wow')
})