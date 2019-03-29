import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import UserComponent from '../components/UserComponent';

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
export default class List extends Component {
  state = {
    items: [],
    description: '',
    date: '',
    picture: '',
    key: '',
  };

  handleSubmit = () => {
    addItem(
      this.state.description,
      this.state.date,
      this.state.picture,
    );
    alert('Success');
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);

      this.setState({ items });
    });
  }

  render() {
    return (

      <ScrollView style={styles.scrollView}>
        {this.state.items.length > 0 ? (
          <UserComponent items={this.state.items} navigation={this.props.navigation} />
          ) : (
          <Text>No items</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  scrollView: {
    height: 400,
  }
});
