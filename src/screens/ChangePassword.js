import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, SafeAreaView, TextInput, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';
let itemsRef = db.ref('/user');
export default class Home extends Component {
   state = {
     currentPassword: '',
     newPassword: '',
     confirmPassword: ''
   };

   handlePasswordChange = (email) => {
   this.setState({
     currentPassword: currentPassword
   });
  }
 handleNewPassword = (email) => {
     this.setState({
       newPassword: newPassword
     });
   }
 handleConfirmPassword = (email) => {
       this.setState({
         confirmPassword: confirmPassword
       });
   }

  changePassword = (currentPassword, newPassword) => {
         if(this.state.newPassword != this.state.confirmPassword){
           alert('New Passwords do not match');
         }
         else{
           var newPass = this.state.newPassword.toString();
           firebase.auth()
            .signInWithEmailAndPassword(firebase.auth().currentUser.email, this.state.currentPassword)
            .then(function(user) {

            firebase.auth().currentUser.updatePassword(newPass).then(function(){

              Alert.alert(
                'Success',
                'Password Changed',
                [
                  {text: 'OK',onPress:() => console.log('Sucess') },
                ],
                {cancelable: false},
              );

            }).catch(function(err){
                //alert(err);
            });

        }).catch(function(err){
            //alert(err);
        });
         }

   }

   render() {
     const { selectedHours, selectedMinutes } = this.state;
     return (
       <SafeAreaView style={styles.safeArea}>
       <View style={styles.columnView}>
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
           <ScrollView>
             <View style={styles.main}>
               <View style={styles.buttonView}>
                 <Text style={styles.title}>Current Password</Text>
                 <TextInput style={styles.textInput}
                   secureTextEntry={true}
                  onChangeText={currentPassword => this.setState({ currentPassword })} />
               </View>

               <View style={styles.buttonView}>
                 <Text style={styles.title}>New Password</Text>
                 <TextInput style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={newPassword => this.setState({ newPassword })} />
               </View>

               <View style={styles.buttonView}>
                 <Text style={styles.title}>Confrim Password</Text>
                 <TextInput style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={confirmPassword => this.setState({ confirmPassword })} />
               </View>

               <TouchableHighlight
                 style={styles.button}
                 underlayColor="white"
                 onPress={this.changePassword}
               >
                 <Text style={styles.buttonText}>Submit</Text>
               </TouchableHighlight>

               <TouchableHighlight
                 style={styles.button}
                 underlayColor="white"
                 onPress={() => this.props.navigation.navigate('Home')}
               >
                 <Text style={styles.buttonText}>Cancel</Text>
               </TouchableHighlight>



             </View>
           </ScrollView>
         </ImageBackground>
         </View>
       </SafeAreaView>
     );
   }
 }
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding:10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    paddingRight: 5,
    width: '30%'
  },
    title1: {
      fontSize: 18,
      alignSelf: 'center',
      justifyContent: 'center',
      color: 'white',
      paddingRight: 5,
      paddingLeft: 5,
    },
    title2: {
       fontSize: 18,
        color: 'blue',
    },
  textInput: {
    height: 40,
    fontSize: 18,
    width: '70%',
    borderColor: 'white',
    backgroundColor: 'rgba(57,189,225,0.6)',
    borderWidth: 1,
    marginTop: 8,
    color: 'white',
  },
    textInput1: {
      height: 40,
      fontSize: 18,
      width: '100%',
      borderColor: 'white',
      backgroundColor: 'rgba(57,189,225,0.6)',
      borderWidth: 1,
      marginTop: 8,
      color: 'white',
      alignItems: 'center'
    },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',

  },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
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
  backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
  },
  columnView: {
      flex:1,
  },
  buttonView: {
      flexDirection:'row',
      marginTop: 5,
      marginBottom: 5,
  },
  button: {
      backgroundColor: 'rgba(45,78,134,0.7)',
      alignSelf: 'center',
      width: '100%',
      borderWidth: 1,
      marginTop: 5,
      marginBottom: 5,
      borderColor: 'white',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
