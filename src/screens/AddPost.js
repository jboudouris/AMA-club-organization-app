import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import { db } from '../config';

let addItem = (description, date, picture) => {
let valuekey = db.ref('/post').push().key;

  db.ref('/post/' + valuekey).update({
    description: description,
    date: new Date(),
    picture: picture,
    key: valuekey,

  });
};

export default class AddItem extends Component {
  state = {
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

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Description</Text>
          <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />

          <Text style={styles.title}>Date</Text>
          <TextInput style={styles.itemInput} onChangeText={date => this.setState({ date })} />

          <Text style={styles.title}>Picture</Text>
          <TextInput style={styles.itemInput} onChangeText={picture => this.setState({ picture })} />

          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
});
