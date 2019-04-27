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
             <View style={{flex:1, flexDirection:'row', height: 50}}>
               <View style={{flex:2}}>
                  <TouchableHighlight
                      style={styles.event}
                        >
                          <Text style={styles.itemtext1}>{item.name}</Text>
                  </TouchableHighlight>
               </View>
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
     itemtext1: {
         fontSize: 20,
         marginTop: 10,
         color: 'white',
         textAlign: 'center'
     },
     event: {
         backgroundColor: 'rgba(45,78,134,0.8)',
         borderColor: 'rgba(0,0,0,.3)',
         borderWidth: 1,
         height: '100%',
     },
 });
