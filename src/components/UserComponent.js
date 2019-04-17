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
                    this.props.navigation.navigate('Chat', {
                      email: item.email,
                      first_Name: item.first_Name,
                      user: firebase.auth().currentUser.email,
                      userKey: item.userKey,

                    });

                  }}

                >
                  <Text style={styles.btntxt}>{item.first_Name} {item.last_Name}</Text>
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
    button: {
        backgroundColor: 'rgba(255,255,255,.5)',
        height: 40,
        borderColor: 'rgba(0,0,0,.3)',
        borderTopWidth: .5,
        borderBottomWidth: .25,
        justifyContent: 'center',
    },
    btntxt: {
        fontSize: 18,
        marginLeft: 5,
        color: 'rgba(0,0,0,.6)',
    },
});
