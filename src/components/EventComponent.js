import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired
  };

  handleSubmit = () => {
  };
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
          return (
            <View key={index}>
              <Text style={styles.itemtext}>Event Name: {item.name}</Text>
              <Text style={styles.itemtext}>Location: {item.location}</Text>
              <Text style={styles.itemtext}>Date: {item.date}</Text>
              <Text style={styles.itemtext}>Description: {item.description}</Text>

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
