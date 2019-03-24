import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
let itemsRef = db.ref('/items');
export default class ItemComponent extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      //}
    });
  }
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {

          return (
            <View key={index}>
              <Text style={styles.itemtext}>{item.key}</Text>
              <Text style={styles.itemtext}>{item.name}</Text>
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
