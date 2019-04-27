import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TouchableHighlight, Button } from 'react-native';
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
             <View style={{flex:1, flexDirection:'row', height: 50}}>
               <View style={{flex:2}}>
                  <TouchableHighlight
                      style={styles.event}
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
                          other_Name: item.first_Name + item.last_Name,
                          full_Name: this.props.full_Name,
                            });

                          }}

                        >
                          <Text style={styles.itemtext1}>{item.first_Name} {item.last_Name}</Text>
                  </TouchableHighlight>
               </View>
                  <View style={{flex:1}}>
                     <TouchableOpacity
                         style={styles.btn}
                         onPress={() => {this.props.navigation.navigate('Chat', {
                              email: item.email,
                              first_Name: item.first_Name,
                              user: firebase.auth().currentUser.email,
                              userKey: item.userKey,
                              otherfull_Name: item.first_Name + item.last_Name,
                         });
                         }}
                     >
                         <Text style = {styles.itemtext}> Chat </Text>
                     </TouchableOpacity>
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
    itemtext: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    itemtext1: {
        fontSize: 20,
        marginTop: 10,
        color: 'white',
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
    event: {
        backgroundColor: 'rgba(45,78,134,0.8)',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 1,
        height: '100%',
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
});
