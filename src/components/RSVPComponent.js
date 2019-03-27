import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
import firebase from 'firebase';

export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };


  render() {
    return (
      <View>
        {this.props.items.map((item, index) => {

          return (
            <View key={index}>
              <Text style={styles.buttonText}>{item.name}</Text>
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
