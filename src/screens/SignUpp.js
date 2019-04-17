import React from 'react'
import { Image, TouchableOpacity, ImageBackground, StyleSheet, Text, TextInput, View, Button, SafeAreaView } from 'react-native'
import firebase from 'firebase';
import { db } from '../config';
let config = {
  apiKey: "AIzaSyB9kMpxhilLczlWR57TLOM8IMxKuUEcRW0",
    authDomain: "react-firebase-cd68d.firebaseapp.com",
    databaseURL: "https://react-firebase-cd68d.firebaseio.com",
    projectId: "react-firebase-cd68d",
    storageBucket: "react-firebase-cd68d.appspot.com",
    messagingSenderId: "57969678002"
};

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    confirmedPassword: '',
    first_Name: '',
    last_Name: '',
    req: '',
    errorMessage: null
  }
  handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          (user)=>{
            if(user){
              if(this.state.email.includes("@wisc.edu")) {
                db.ref('/user/' + user.uid).update({
                    email: this.state.email,
                    password: this.state.password,
                    userKey: user.uid,
                    first_Name: this.state.first_Name,
                    last_Name: this.state.last_Name,
                    attendantNum: 0,
                    role: 'user',
                    quote: '',
                    phone_Number: '',
                    alt_Email: '',
                });
              this.sendVerification();
              firebase.auth().signOut();

              //firebase.auth().signOut();
              //alert(user.uid);
              }
            }
          }
        )
        .then(() => this.props.navigation.navigate('Loginn'))
        .catch(error => this.setState({ errorMessage: error.message }))

    }

  sendVerification = () => {
    let user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {

    }).catch(function(error) {

    });
  }

  checkEmail = () => {
    if (this.state.email.includes("@wisc.edu") == true){
      if (this.state.password == this.state.confirmedPassword)
      {
        this.handleSignUp();
      }
      else
      {
        alert('Passwords do not match.');
      }
    }
   else {
      alert("Please enter your Wisc email (@wisc.edu).");
    }
  }

  handleEmailChange = (email) => {
    this.setState({
      email: email
    });
  }

  handlePasswordChange = (password) => {
    this.setState({
      password: password
    });
  }

  handleConPasswordChange = (confirmedPassword) => {
    this.setState({
      confirmedPassword: confirmedPassword
    });
  }
  handleFirstNameChange = (first_Name) => {
    this.setState({
      first_Name: first_Name
    });
  }
  handleLastNameChange = (last_Name) => {
    this.setState({
      last_Name: last_Name
    });
  }
render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
          <ImageBackground
              style = {styles.backgroundImage}
              source = {require('../backgrounds/BG2.png')}
          >
             <View style={styles.container}>
                <Image
                    style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                    source = {require('../icons/AMA_white.png')}
                />
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}
                <TextInput
                  placeholder="First Name"
                  autoCapitalize="none"
                  placeholderTextColor= 'white'
                  style={styles.textInput}
                  onChangeText={first_Name => this.handleFirstNameChange( first_Name )}
                  value={this.state.first_Name}
                />
                <TextInput
                  placeholder="Last Name"
                  autoCapitalize="none"
                  placeholderTextColor= 'white'
                  style={styles.textInput}
                  onChangeText={last_Name => this.handleLastNameChange( last_Name )}
                  value={this.state.last_Name}
                />
                <TextInput
                  placeholder="Email"
                  autoCapitalize="none"
                  placeholderTextColor= 'white'
                  style={styles.textInput}
                  onChangeText={email => this.handleEmailChange( email )}
                  value={this.state.email}
                />
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  autoCapitalize="none"
                  placeholderTextColor= 'white'
                  style={styles.textInput}
                  onChangeText={password => this.handlePasswordChange( password )}
                  value={this.state.password}
                />
                <TextInput
                  secureTextEntry
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  placeholderTextColor= 'white'
                  style={styles.textInput}
                  onChangeText={confirmedPassword => this.handleConPasswordChange( confirmedPassword )}
                  value={this.state.confirmedPassword}
                />
                <TouchableOpacity style = {styles.btn1} onPress={this.checkEmail}>
                    <Text style={styles.btntxt}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.btn1} onPress={() => this.props.navigation.navigate('Loginn')}>
                    <Text style={styles.btntxt}>Already have an account? Log in here</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
      </View>
      </SafeAreaView>
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
        alignSelf: 'center',
        width: '90%',

        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntxt: {
        fontSize: 18,
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
    fontSize: 18,
    width: '90%',
    borderColor: 'white',
    backgroundColor: 'rgba(57,189,225,0.6)',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
})
