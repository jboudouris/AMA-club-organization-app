import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
let itemsRef = db.ref('/post');
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
      <View>
        {this.props.items.map((item, index) => {

          return (
            <View style={styles.container} key={index}>
              <Text>{item.date}</Text>
              <Text>Some Name</Text>
              <Text style = {styles.itemtext}>{item.description}</Text>
            </View>
          );


        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  itemtext: {
    padding: 5,
    fontSize: 25,
  }
});
