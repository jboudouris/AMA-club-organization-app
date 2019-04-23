import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableHighlight, Switch} from 'react-native';
import PropTypes from 'prop-types';
import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');

export default class ItemComponent extends Component {
  constructor() {
      super();
      this.state = {
         switch1Value: false,
      }
   }
   toggleSwitch1 = (value) => {
      this.setState({switch1Value: value})
      if (value == true) {
          Alert.alert('true');
      } else {
          Alert.alert('false');
      }
   }

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
              style={styles.button}
              underlayColor="white"
                >
                <View>
                  <Text style={styles.btntxt}>{item.first_Name} {item.last_Name}</Text>
                  <Switch
                    onValueChange = {this.toggleSwitch1}
                    value = {this.state.switch1Value}
                  />
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
