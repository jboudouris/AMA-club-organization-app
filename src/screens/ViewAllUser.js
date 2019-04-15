import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
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
    userList: [],
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
    let execArr = [];
    let userArr = [];
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      if (items.length > 0 ){
          for (let i=0; i<items.length; i++){
            if (items[i].role == 'exec'){
              execArr.push(items[i]);
            }
            else {
              userArr.push(items[i]);
            }
          }
      }

      this.setState({
        items: execArr
      });

      this.setState({
        userList: userArr
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}> Executive Member </Text>
        {this.state.items.length > 0 ? (
          <UserComponent items={this.state.items} navigation={this.props.navigation} />
          ) : (
          <Text>No items</Text>
        )}
        <Text style={styles.title}> Club Member </Text>
        {this.state.userList.length > 0 ? (
          <UserComponent items={this.state.userList} navigation={this.props.navigation} />
          ) : (
          <Text>No items</Text>
        )}
      </ScrollView>
      </SafeAreaView>
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
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    paddingRight: 5,
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
});
