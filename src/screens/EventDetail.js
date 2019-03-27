import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

import { db } from '../config';
let itemsRef = db.ref('/event');

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
    eventUKey: '',
  };

  componentDidMount() {

    this.anotherFunc();
  }

  anotherFunc = () => {
    let date = this.props.navigation.state.params.date;
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      for (let i=0; i< items.length; i++)
      {
        if(items[i].date == date)
        {
          this.setState({
            name: items[i].name,
            date: items[i].date,
            time: items[i].time,
            location: items[i].location,
            description: items[i].description,
            picture: items[i].picture,
            RSVP: items[i].RSVP,
            eventKey: items[i].eventKey,
            eventUKey: items[i].key,
          });
        }
      }
    });
}



  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>{this.state.name}</Text>
        <Text style={styles.title}>{this.props.navigation.state.params.date}</Text>
        <Text style={styles.title}>{this.state.date}</Text>
        <Text style={styles.title}>{this.state.time}</Text>
        <Text style={styles.title}>{this.state.location}</Text>
        <Text style={styles.title}>{this.state.description}</Text>
        <Text style={styles.title}>{this.state.picture}</Text>
        <Text style={styles.title}>{this.state.RSVP}</Text>
        <Text style={styles.title}>{this.state.eventKey}</Text>
        <Text style={styles.title}>{this.state.eventUKey}</Text>
        <Button
          title="RSVP the event"
          onPress={() => {this.props.navigation.navigate('RSVP', {
                  email: this.props.navigation.state.params.email,
                  first_Name: this.props.navigation.state.params.first_Name,
                  last_Name: this.props.navigation.state.params.last_Name,
                  role: this.props.navigation.state.params.role,
                  currentUserUid: this.props.navigation.state.params.currentUserUid,
                  full_Name:this.props.navigation.state.params.full_Name,
                  eventName: this.state.name,
                  eventUKey: this.state.eventUKey,
                  attendantNum: this.props.navigation.state.params.attendantNum,
                });
              }}
        />
      </View>
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
