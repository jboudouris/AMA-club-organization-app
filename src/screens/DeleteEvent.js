import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';

import { db } from '../config';
let itemsRef = db.ref('/event');


export default class AddItem extends Component {
  state = {
    name: ''
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      let notFound = false;
      let key = '';
      for (let i=0; i< items.length; i++){
        if (items[i].name == this.state.name)
        {
          key = items[i].key;
          let toRemove = '/event/' + key;
          db.ref(toRemove).remove();
          //alert('success');
          break
        }
        else
        {
        }
      }

    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
        <Text style={styles.title}>Delete Event</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
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
