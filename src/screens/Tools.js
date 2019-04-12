import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';

let itemsRef = db.ref('/user');

export default class Home extends Component {
  state = {
    email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    currentUserUid: '',
    full_Name: '',
    attendantNum: '',
    cond: 'true',
    phone_Number: '',
    quote: '',
    payment: '',
  };
  logout(){
    firebase.auth().signOut();
  }

  renderElement(){
   if(this.state.role == 'user'){
      return <Button
        title="Go to Calender"
        onPress={() => {this.props.navigation.navigate('Calender', {
                email: this.state.email,
                first_Name: this.state.first_Name,
                last_Name: this.state.last_Name,
                role: this.state.role,
                currentUserUid: this.state.currentUserUid,
                full_Name: this.state.full_Name,
                attendantNum: this.state.attendantNum,
              });
            }}
      />;
    }
  else if (this.state.role == 'admin') {
   return <Button
     title="Create Event"
     onPress={() => this.props.navigation.navigate('CreateEvent')}
   />;
 }
 return null;
}
  render() {
    return (
       <View style = {styles.columnView}>
         <View style  = {styles.header}>
            <View style = {{paddingLeft: 10, flex:1, alignItems:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tools')}>
                    <Image
                        style = {{width: 35, height: 35, margin: 10}}
                        source = {require('../icons/gear_1.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style = {{flex:1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                        source = {require('../icons/AMA_white.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style = {{paddingRight: 10, flex:1, alignItems:'flex-end'}}>
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('Profile', {
                       email: this.state.email,
                       first_Name: this.state.first_Name,
                       last_Name: this.state.last_Name,
                       role: this.state.role,
                       currentUserUid: this.state.currentUserUid,
                       full_Name: this.state.full_Name,
                       attendantNum: this.state.attendantNum,
                       phone_Number: this.state.phone_Number,
                       quote: this.state.quote,
                    });
                    }}
                >
                    <Avatar rounded title="LM" />
                </TouchableOpacity>
            </View>
         </View>

          <ImageBackground
              style = {styles.backgroundImage}
              source = {require('../backgrounds/BG2.png')}
          >
            <View>
             <ScrollView style = {{backgroundColor: 'transparent'}}>
                 <View style = {styles.buttonView}>
                        <TouchableOpacity
                            style = {styles.btn}
                            onPress={() => this.logout()}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>
                </View>
             </ScrollView>
            </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    btn: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0.5)',
        margin: 15,
    },
    buttonView: {
        flex: 1,
        height: 200,
        flexDirection:'row',
        backgroundColor: 'transparent',
    },
    columnView:  {
        flex:1
    },
    header: {
        height: 70,
        backgroundColor: '#EDD395',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAMA:  {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',

    }
});