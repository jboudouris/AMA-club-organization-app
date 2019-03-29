import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {KeyboardAvoidingView, ScrollView, View, Modal, Text, TextInput, TouchableHighlight, Button} from 'react-native';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');
let valuekey = '';

let addUser = (        alt_Email,
                       first_Name,
                       last_Name,
                       full_Name,
                       phone_Number,
                       quote,
                       payment, role) => {

  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].email == firebase.auth().currentUser.email)
      {

        valuekey = items[i].userKey;
        alert(valuekey);

        break;
      }
    }
  });

    alert(first_Name);
  firebase.database().ref('user/' + valuekey).update({
    "first_Name": first_Name,
  });


};



export default class Profile extends Component {
constructor(props) {
  super(props);
  this.state = {
    marked: null,
    email: '',
    alt_Email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    quote: '',
    payment: '',
    phone_Number: '',
    currentUserUid: '',
    full_Name: '',
    attendantNum: '',
  };
}

//Call mark function
componentDidMount() {
  this.setState({
    email: this.props.navigation.state.params.email,
    first_Name: this.props.navigation.state.params.first_Name,
    last_Name: this.props.navigation.state.params.last_Name,
    role: this.props.navigation.state.params.role,
  });
  alert(this.state.email);
}

 handleSubmit = () => {

    alert('first' + this.state.first_Name );

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
 };


render() {
  return (
    <KeyboardAvoidingView>
    <ScrollView>
    <View>
      <Text>First Name: </Text>
      <TextInput
           placeholder={this.props.navigation.state.params.first_Name}
          onChangeText={ (text) => this.setState({first_Name:text}) }
          underlineColorAndroid='transparent'
      />
      <Text>Last Name: </Text>
      <TextInput
           placeholder={this.props.navigation.state.params.last_Name}
          onChange={ (text) => this.setState({last_Name:text}) }
          underlineColorAndroid='transparent'
      />
      <Text>Email: {this.props.navigation.state.params.email}</Text>
      <Text>Alternate Email:</Text>
      <TextInput
          onChange={ (text) => this.setState({alt_Email:text}) }
          underlineColorAndroid='transparent'
      />
      <Text>Phone Number: </Text>
      <TextInput
          onChange={ (text) => this.setState({phone_Number:text}) }
          underlineColorAndroid='transparent'
      />
      <Text>Status: </Text>
      <TextInput
          placeholder={this.props.navigation.state.params.role}
          onChange={ (text) => this.setState({role:text}) }
          underlineColorAndroid='transparent'
      />
      <Text>Payment: </Text>
      <TextInput
          onChange={ (text) => this.setState({payment:text}) }
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