import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';

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
              <Button
                title= {item.name}
                color="red"
                onPress={this.handleSubmit}
              />
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
