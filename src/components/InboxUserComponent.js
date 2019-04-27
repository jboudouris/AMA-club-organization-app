import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');

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
            <TouchableHighlight
              style={styles.btn}
              underlayColor="white"
              onPress={() => {
                this.props.navigation.navigate('Chat', {
                  email: item.email,
                  first_Name: "item.first_Name",
                  user: firebase.auth().currentUser.email,
                  userKey: item.otherUserKey,
                  to: "to",

                });

              }}

            >
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.itemtext1}>{item.to}</Text>
              </View>
              <View style={{flex:2}}>
                <Text style={styles.itemtext2}>{item.message}</Text>
              </View>
            </View>
            </TouchableHighlight>
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
  },
  btn: {
      backgroundColor: 'rgba(45,78,134,1)',
      alignSelf: 'center',
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,.2)',
      alignItems: 'center',
      justifyContent: 'center',
  },
      itemtext1: {
          fontSize: 20,
          marginLeft: 3,
          color: 'white',
      },
      itemtext2: {
          fontSize: 14,
          color: 'white',
          marginLeft: 5,
          marginBottom: 3,
      },

});
