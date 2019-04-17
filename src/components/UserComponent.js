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
            <View key={index}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="white"
              onPress={() => {
                this.props.navigation.navigate('UserProfile', {
                  email: item.email,
                  first_Name: item.first_Name,
                  last_Name: item.last_Name,
                  quote: item.quote,
                  status: item.status,
                  phone_Number: item.phone_Number,
                  user: firebase.auth().currentUser.email,
                  userKey: item.userKey,

                });

              }}

            >
              <Text style={styles.buttonText}>{item.email}</Text>
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
  }
});
