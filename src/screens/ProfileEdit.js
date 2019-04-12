import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {KeyboardAvoidingView, ScrollView, View, Modal, Text, TextInput, TouchableHighlight, Button} from 'react-native';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');
let valuekey = '';

let addUser = (alt_Email, first_Name, last_Name, full_Name, phone_Number, quote, payment, role) => {
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].email == firebase.auth().currentUser.email)
      {
        valuekey = items[i].userKey;
        break;
      }
    }
  });

    alert(last_Name);
  firebase.database().ref('user/' + valuekey).update({
    "first_Name": first_Name,
    "last_Name": last_Name,
    "full_Name": first_Name + " " + last_Name,
    "alt_Email": alt_Email,
    "phone_Number": phone_Number,
    "quote": quote,
    "payment": payment,
    "role": role,
  });


};



export default class Profile extends Component {
 state = {
    email: '',
    alt_Email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    quote: '',
    payment: '',
    phone_Number: '',
    full_Name: '',
 }

//Call mark function
componentDidMount() {
  this.setState({
    email: this.props.navigation.state.params.email,
    first_Name: this.props.navigation.state.params.first_Name,
    last_Name: this.props.navigation.state.params.last_Name,
    role: this.props.navigation.state.params.role,
    phone_Number: this.props.navigation.state.params.phone_Number,
    quote: this.props.navigation.state.params.quote,
    payment: this.props.navigation.state.params.payment,
  });
}

  handleAltEmailChange = (alt_Email) => {
    this.setState({
      alt_Email: alt_Email
    });
  }
  handleFirstNameChange = (first_Name) => {
    this.setState({
      first_Name: first_Name
    });
  }
  handleLastNameChange = (last_Name) => {
    this.setState({
      last_Name: last_Name
    });
  }

  handlePhoneNumberChange = (phone_Number) => {
    this.setState({
      phone_Number: phone_Number
    });
  }

  handleQuoteChange = (quote) => {
    this.setState({
      quote: quote
    });
  }

  handleRoleChange = (role) => {
    this.setState({
      role: role
    });
  }

  handlePaymentChange = (payment) => {
    this.setState({
      payment: payment
    });
  }

 handleSubmit = () => {
    addUser(
        this.state.alt_Email,
        this.state.first_Name,
        this.state.last_Name,
        this.state.full_Name,
        this.state.phone_Number,
        this.state.quote,
        this.state.payment,
        this.state.role
    );
    this.props.navigation.navigate('Profile', {
        email: this.state.email,
        first_Name: this.state.first_Name,
        last_Name: this.state.last_Name,
        role: this.state.role,
        currentUserUid: this.state.currentUserUid,
        full_Name: this.state.full_Name,
        attendantNum: this.state.attendantNum,
        phone_Number: this.state.phone_Number,
        quote: this.state.quote,
    });
 };


render() {
  return (
    <KeyboardAvoidingView>
    <ScrollView>
    <View>
      <Text>First Name: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.first_Name}
          onChangeText={ first_Name => this.handleFirstNameChange( first_Name ) }
          underlineColorAndroid='transparent'
      />
      <Text>Last Name: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.last_Name}
          onChangeText={ last_Name => this.handleLastNameChange( last_Name ) }
          underlineColorAndroid='transparent'
      />
      <Text>Email: {this.props.navigation.state.params.email}</Text>
      <Text>Alternate Email:</Text>
      <TextInput
          onChangeText={ alt_Email => this.handleAltEmailChange( alt_Email ) }
          underlineColorAndroid='transparent'
      />
      <Text>Phone Number: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.phone_Number}
          onChangeText={ phone_Number => this.handlePhoneNumberChange( phone_Number ) }
          underlineColorAndroid='transparent'
      />
      <Text>Quote:</Text>
      <TextInput
          placeholder={this.props.navigation.state.params.quote}
          onChangeText={ quote => this.handleQuoteChange( quote ) }
          underlineColorAndroid='transparent'
      />
      <Text>Status: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.role}
          onChangeText={ role => this.handleRoleChange( role ) }
          underlineColorAndroid='transparent'
      />
      <Text>Payment: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.payment}
          onChangeText={ payment => this.handlePaymentChange( payment ) }
          underlineColorAndroid='transparent'
      />
      <Button
        title="Submit"
        onPress={this.handleSubmit}
      />
      <Button
        title="Cancel"
        onPress={() => this.props.navigation.navigate('Profile')}
      />
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
}
