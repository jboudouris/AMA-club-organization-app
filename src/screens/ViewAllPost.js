import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import PostComponent from '../components/PostComponent';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/post');
let addItem = (description, date, picture) => {
let valuekey = db.ref('/post').push().key;

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
      //}
    });
  }

  render() {
    return (

      <View>
        <Text> Archives </Text>
        <ScrollView>
            {this.state.items.length > 0 ? (
              <PostComponent items={this.state.items} />
              ) : (
              <Text>No items</Text>
            )}
        </ScrollView>
        <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});
