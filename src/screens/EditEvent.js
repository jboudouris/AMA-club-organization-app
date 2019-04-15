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
let itemsRef = db.ref('/event');
let valuekey = '';
let addItem = (name, description, date, picture) => {

  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].name == name)
      {

        valuekey = items[i].key;

        break;
      }
    }
  });
  //get event unique keys
  firebase.database().ref('event/' + valuekey).update({
    "description": description,
  });


};

export default class AddItem extends Component {
  state = {
    name: '',
    description: '',
    date: '',
    picture: '',
    key: '',
  };

  handleSubmit = () => {
    addItem(
      this.state.name,
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
        <Text style={styles.title}>Name</Text>
        <TextInput style={styles.itemInput} onChangeText={name => this.setState({ name })} />

          <Text style={styles.title}>Description</Text>
          <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />

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
