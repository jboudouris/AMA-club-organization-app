import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
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
    first_Name: '',
    last_Name: '',
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
                role: 'user',
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
  //  if (this.state.email.includes("@wisc.edu") == true){
      this.handleSignUp();
  //  }
//   else {
  //    alert("Please enter your wisc email");
  //  }
  }
render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={first_Name => this.setState({ first_Name })}
          value={this.state.first_Name}
        />
        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={last_Name => this.setState({ last_Name })}
          value={this.state.last_Name}
        />
        <Button title="Sign Up" onPress={this.checkEmail} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Loginn')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})