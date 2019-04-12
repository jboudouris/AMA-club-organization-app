import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { db } from '../config';
let itemsRef = db.ref('/event');

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired
  };

  handleSubmit = () => {
  };

  deleteEvent = (eventKey) => {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      let notFound = false;
      let key = '';
      for (let i=0; i< items.length; i++){
        if (items[i].key == eventKey)
        {
          let toRemove = '/event/' + eventKey;
          db.ref(toRemove).remove();
          //alert('success');
          break
        }
        else
        {
        }
      }

    });
  }
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext}>Event Name: {item.name}</Text>

              <View>
              <TouchableHighlight
                style={styles.button}
                underlayColor="white"
                onPress={() => {
                    this.props.navigation.navigate('RSVPList', {
                    eventName: item.name,
                  });

                }}

              >
                <Text style={styles.buttonText}>{item.name} RSVP List</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                underlayColor="white"
                onPress={() => this.deleteEvent(item.key)}

              >
                <Text style={styles.buttonText}> Delete</Text>
              </TouchableHighlight>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
