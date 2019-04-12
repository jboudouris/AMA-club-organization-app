import React from 'react'
import { TouchableOpacity, ImageBackground, Image, StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyB9kMpxhilLczlWR57TLOM8IMxKuUEcRW0",
    authDomain: "react-firebase-cd68d.firebaseapp.com",
    databaseURL: "https://react-firebase-cd68d.firebaseio.com",
    projectId: "react-firebase-cd68d",
    storageBucket: "react-firebase-cd68d.appspot.com",
    messagingSenderId: "57969678002"
};
export default class Login extends React.Component {
  state = { email: '', errorMessage: null }

  handleForget = () => {
    let email = this.state.email;
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      //Email sent.
      alert('Check your email for further instructions.');
    }).catch(function(error) {
      //An error happaned
      alert('There was no account fount with the information provided');
    });
   }

   handleEmailChange = (email) => {
     this.setState({
       email: email
     });
   }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
            style = {styles.backgroundImage}
            source = {require('../backgrounds/BG2.png')}
        >
            <View style = {styles.container}>
                <Image
                    style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                    source = {require('../icons/AMA_white.png')}
                />
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor= 'white'
                  onChangeText={email => handleEmailChange(email)}
                  value={this.state.email}
                />
                <TouchableOpacity style = {styles.btn1} onPress={this.handleForget}>
                    <Text style={styles.btntxt}>Reset Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.btn1} onPress={() => {this.props.navigation.navigate('Loginn')}}>
                    <Text style={styles.btntxt}>Return to Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    btn1: {
        backgroundColor: 'rgba(127,141,221,0.6)',
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,

        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntxt: {
        fontSize: 20,
        color: 'white',
    },
    buttonView: {
        flexDirection:'row',
        backgroundColor: 'transparent',
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    fontSize: 20,
    width: '90%',
    borderColor: 'white',
    backgroundColor: 'rgba(57,189,225,0.6)',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
  }
})