import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'
import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyB9kMpxhilLczlWR57TLOM8IMxKuUEcRW0",
    authDomain: "react-firebase-cd68d.firebaseapp.com",
    databaseURL: "https://react-firebase-cd68d.firebaseio.com",
    projectId: "react-firebase-cd68d",
    storageBucket: "react-firebase-cd68d.appspot.com",
    messagingSenderId: "57969678002"
};

export default class Loading extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user == null){
       this.props.navigation.navigate('Loginn')
     }
     //Allow only registered user who verified their email
     //to login successfully
     //original: (user != null && user.emailVerified == true)
     else if (user != null && user.emailVerified == true) {
      // firebase.auth().signOut();
       this.props.navigation.navigate('Home')
       //alert('Please verify your email')
     }
     //If the registered user who haven't verified their email,
     //prevent them from log in and alert them to verify email
     //original(user != null && user.emailVerified == false)
     else if (user != null && user.emailVerified == false){
       alert('Please verify your email');
     }
     })
 }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
})
