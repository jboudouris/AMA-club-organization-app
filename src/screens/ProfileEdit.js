import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {KeyboardAvoidingView, ScrollView, View, Modal, Text, TextInput, TouchableHighlight, Button} from 'react-native';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');
let addItem = (description, date, picture) => {
let valuekey = db.ref('/user').push().key;

  db.ref('/post/' + valuekey).update({
    description: description,
    date: new Date(),
    picture: picture,
    user: firebase.auth().currentUser.uid,
    key: valuekey,


  });
};



export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      marked: null,
      email: '',
      first_Name: '',
      last_Name: '',
      role: '',
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
      currentUserUid: this.props.navigation.state.params.currentUserUid,
      full_Name: this.props.navigation.state.params.full_Name,
      attendantNum: this.props.navigation.state.params.attendantNum,
    });
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].email == this.state.email)
      {

        valuekey = items[i].key;

        break;
      }
    }
  });
}
  render() {
    return (
      <KeyboardAvoidingView>
      <ScrollView>
      <View>
        <Text>First Name: </Text>
        <TextInput
             placeholder={this.state.first_Name}
            onChange={ (text) => this.setState({first_Name:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Last Name: </Text>
        <TextInput
             placeholder={this.state.last_Name}
            onChange={ (text) => this.setState({last_Name:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Email: </Text>
        <TextInput
              placeholder={this.state.email}
            onChange={ (text) => this.setState({email:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Re-enter Email: </Text>
        <TextInput
              placeholder={this.state.email}
            onChange={ (text) => this.setState({email:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Phone Number: </Text>
        <TextInput
            onChange={ (text) => this.setState({phone_Number:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Status: </Text>
        <TextInput
            placeholder={this.state.role}
            onChange={ (text) => this.setState({role:text}) }
            underlineColorAndroid='transparent'
        />
        <Text>Payment: </Text>
        <TextInput
            onChange={ (text) => this.setState({phone_Number:text}) }
            underlineColorAndroid='transparent'
        />
        <Button
          title="Submit"
          onPress={() => this.props.navigation.navigate('Profile')}
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