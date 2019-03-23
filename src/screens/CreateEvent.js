import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';

import { db } from '../config';

let addItem = (name, date, time, location, description, picture, RSVP, eventKey) => {
let valuekey = db.ref('/event').push().key;

  db.ref('/event/' + valuekey).update({
    name: name,
    date: date,
    time: time,
    location: location,
    description: description,
    picture: picture,
    RSVP: RSVP,
    eventKey: eventKey,
    key: valuekey,

  });
};

export default class AddItem extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    picture: '',
    RSVP: '',
    eventKey: '',
    key: '',
  };

  handleSubmit = () => {
    addItem(
      this.state.name,
      this.state.date,
      this.state.time,
      this.state.location,
      this.state.description,
      this.state.picture,
      this.state.RSVP,
      this.state.eventKey,
    );
    alert('Success');
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Event Name</Text>
          <TextInput style={styles.itemInput} onChangeText={name => this.setState({ name })} />

          <Text style={styles.title}>Date</Text>
          <TextInput style={styles.itemInput} onChangeText={date => this.setState({ date })} />

          <Text style={styles.title}>Time</Text>
          <TextInput style={styles.itemInput} onChangeText={time => this.setState({ time })} />

          <Text style={styles.title}>Location</Text>
          <TextInput style={styles.itemInput} onChangeText={location => this.setState({ location })} />

          <Text style={styles.title}>Description</Text>
          <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />

          <Text style={styles.title}>Picture</Text>
          <TextInput style={styles.itemInput} onChangeText={picture => this.setState({ picture })} />

          <Text style={styles.title}>Enable RSVP</Text>
          <TextInput style={styles.itemInput} onChangeText={RSVP => this.setState({ RSVP })} />

          <Text style={styles.title}>Event Key (For Attendant Sign In)</Text>
          <TextInput style={styles.itemInput} onChangeText={eventKey => this.setState({ eventKey })} />


          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
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
  }
});
