import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {View, Modal, Text, TouchableHighlight, Button} from 'react-native';

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
      item: [],
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
    let email = this.props.navigation.state.params.email;
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i = 0; i < items.length; i++)
    {
      if(items[i].email == email)
      {

        this.setState({item: items[i]});

        break;
      }
    }
  });
}
  render() {
    return (
      <View>
        <Text>Name: {this.state.full_Name}</Text>
        <Text>Email: {this.state.email}</Text>
        <Text>Status: {this.state.role}</Text>
        <View>
            {this.state.items > 0 ? (
              <Text>Start a chat</Text>,
              <UserComponent items={this.state.item} navigation={this.props.navigation} />
              ) : (
              <Text>Cannot start a chat at the moment</Text>
            )}
        </View>
        <Button
          title="Edit Account"
          onPress={() => {this.props.navigation.navigate('ProfileEdit', {
             email: this.state.email,
             first_Name: this.state.first_Name,
             last_Name: this.state.last_Name,
             role: this.state.role,
             currentUserUid: this.state.currentUserUid,
             full_Name: this.state.full_Name,
             attendantNum: this.state.attendantNum,
          });
          }}
        />
      </View>
    );
  }
}
