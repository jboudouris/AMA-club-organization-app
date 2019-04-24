import React from 'react'
import { TouchableOpacity, Image,  ImageBackground, StyleSheet, Text, TextInput, View, Button, SafeAreaView } from 'react-native'
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
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
   const { email, password } = this.state
   firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .catch(error => this.setState({ errorMessage: 'Invalid information provided. Please try again' }))
   }

   handlePasswordChange = (password) => {
     this.setState({
       password: password
     });
   }

   handleEmailChange = (email) => {
     this.setState({
       email: email
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                        source = {require('../icons/AMA_white.png')}
                    />
                </TouchableOpacity>
                {this.state.errorMessage &&
                  <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                  </Text>}
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  placeholder="Email"
                  placeholderTextColor='white'
                  onChangeText={email => this.handleEmailChange(email)}
                  value={this.state.email}
                />
                <TextInput
                  secureTextEntry
                  style={styles.textInput}
                  placeholderTextColor= 'white'
                  autoCapitalize="none"
                  placeholder="Password"
                  onChangeText={password => this.handlePasswordChange(password)}
                  value={this.state.password}
                />
                <TouchableOpacity style = {styles.btn1} onPress={this.handleLogin}>
                    <Text style={styles.btntxt}>Login</Text>
                </TouchableOpacity>
                <View style = {styles.buttonView}>
                    <TouchableOpacity style = {styles.btn2} onPress={() => this.props.navigation.navigate('SignUpp')}>
                        <Text style={styles.btntxt}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.btn3} onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                                <Text style={styles.btntxt}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'rgba(45,78,134,0.7)',
        alignSelf: 'center',

        width: '90%',
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn2: {
//        backgroundColor: 'rgba(127,141,221,0.6)',
        backgroundColor: 'rgba(45,78,134,0.7)',
        width: '42.5%',
        marginLeft: 20,
        marginRight: 10,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn3: {
//        backgroundColor: 'rgba(127,141,221,0.6)',
//                backgroundColor: 'rgba(27,47,80,0.5)',
        backgroundColor: 'rgba(45,78,134,0.7)',
        width: '42.5%',
        marginLeft: 10,
        marginRight: 20,
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
