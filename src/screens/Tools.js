import React, { Component } from 'react';
import { Alert,  Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';
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

  componentDidMount() {
    this.setState({
      email: this.props.navigation.state.params.email,
      first_Name: this.props.navigation.state.params.first_Name,
      last_Name: this.props.navigation.state.params.last_Name,
      role: this.props.navigation.state.params.role,
      currentUserUid: this.props.navigation.state.params.currentUserUid,
      full_Name: this.props.navigation.state.params.full_Name,
      attendantNum: this.props.navigation.state.params.attendantNum,
      phone_Number: this.props.navigation.state.params.phone_Number,
      quote: this.props.navigation.state.params.quote,
    });
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

deleteAccountPrompt(){
        Alert.alert(
            'Are you sure you want to delete your account?',
            'Your account will be permanently deleted and all saved information will be lost.',
            [
             {
               text: 'Cancel',
               onPress: () => console.log('Account Deletion Halted'),
               style: 'cancel',
             },
             { text: 'I am sure', onPress: () => this.deleteAccount() },
            ]
        );
}

deleteAccount() {
    let toRemove = '/user/' + firebase.auth().currentUser.uid;
    db.ref(toRemove).remove();
    firebase.auth().signOut();
}

  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style = {styles.columnView}>
                 <View style  = {styles.header}>
                    <View style={{width:'100%'}}>
                        <TouchableOpacity style={styles.headerAMA} onPress={() => this.props.navigation.navigate('Home')}>
                            <Image
                                style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                                source = {require('../icons/AMA_white.png')}
                            />
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
                                        onPress={() => {this.props.navigation.navigate('ProfileEdit', {
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
                                        <Text style={styles.btntxt}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {styles.buttonView}>
                                    <TouchableOpacity
                                        style = {styles.btn}
                                        onPress={() => this.deleteAccountPrompt()}
                                    >
                                        <Text style={styles.btntxt}>Delete Account</Text>
                                    </TouchableOpacity>
                                </View>
                                    <View style = {styles.buttonView}>
                                        <TouchableOpacity
                                            style = {styles.btn}
                                            onPress={() => {this.props.navigation.navigate('EditUsers', {
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
                                            <Text style={styles.btntxt}>Edit Users</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style = {styles.buttonView}>
                                        <TouchableOpacity
                                            style = {styles.btn}
                                            onPress={() => {this.props.navigation.navigate('ListAllEvent', {
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
                                            <Text style={styles.btntxt}>Edit Event</Text>
                                        </TouchableOpacity>
                                    </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
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
        margin: 5,
    },
    btntxt: {
        alignSelf: 'center',
        marginTop: 25,
        color: 'rgba(0,0,0,.8)',
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonView: {
        flex: 1,
        height: 100,
        flexDirection:'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    columnView:  {
        flex:1
    },
    header: {
        height: 70,
        backgroundColor: '#1b2f50',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerAMA:  {
        backgroundColor: 'transparent',
        alignSelf: 'center',
        alignItems: 'center',

    },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
});
