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
              <View>
                  <Text style={styles.itemtext1}>Some Name</Text>
                  <Text style={styles.itemtext2}>{item.date}</Text>
              </View>
              <Text style={styles.itemtext3}>{item.description}</Text>
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
        backgroundColor: 'rgba(31,235,221,0.6)',
        borderColor: 'rgba(0,0,0,.4)',
        borderWidth: 1,
        borderRadius: 8,
    },
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemtext1: {
        paddingTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 24,
        color: 'white',
    },
    itemtext2: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 14,
        color: 'white',
    },
    itemtext3: {
        padding: 5,
        fontSize: 20,
        color: 'white',
    }
});
