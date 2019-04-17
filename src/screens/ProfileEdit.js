import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {ImageBackground, Image, KeyboardAvoidingView, ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Button, SafeAreaView, StyleSheet} from 'react-native';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');
let valuekey = '';

let addUser = (alt_Email, first_Name, last_Name, full_Name, phone_Number, quote, payment, role) => {
  itemsRef.on('value', snapshot => {
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i=0; i< items.length; i++)
    {
      if(items[i].email == firebase.auth().currentUser.email)
      {
        valuekey = items[i].userKey;
        break;
      }
    }
  });
  firebase.database().ref('user/' + valuekey).update({
    "first_Name": first_Name,
    "last_Name": last_Name,
    "full_Name": first_Name + " " + last_Name,
    "alt_Email": alt_Email,
    "phone_Number": phone_Number,
    "quote": quote,
    "payment": payment,
    "role": role,
  });


};



export default class Profile extends Component {
 state = {
    email: '',
    alt_Email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    quote: '',
    payment: '',
    phone_Number: '',
    full_Name: '',
 }

//Call mark function
componentDidMount() {
  this.setState({
    email: this.props.navigation.state.params.email,
    first_Name: this.props.navigation.state.params.first_Name,
    last_Name: this.props.navigation.state.params.last_Name,
    role: this.props.navigation.state.params.role,
    phone_Number: this.props.navigation.state.params.phone_Number,
    quote: this.props.navigation.state.params.quote,
    payment: this.props.navigation.state.params.payment,
  });
}

  handleAltEmailChange = (alt_Email) => {
    this.setState({
      alt_Email: alt_Email
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

  handlePhoneNumberChange = (phone_Number) => {
    this.setState({
      phone_Number: phone_Number
    });
  }

  handleQuoteChange = (quote) => {
    this.setState({
      quote: quote
    });
  }

  handleRoleChange = (role) => {
    this.setState({
      role: role
    });
  }

  handlePaymentChange = (payment) => {
    this.setState({
      payment: payment
    });
  }

 handleSubmit = () => {
    addUser(
        this.state.alt_Email,
        this.state.first_Name,
        this.state.last_Name,
        this.state.full_Name,
        this.state.phone_Number,
        this.state.quote,
        this.state.payment,
        this.state.role
    );
    this.props.navigation.navigate('Tools', {
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
 };


render() {
  return (
    <SafeAreaView style={styles.safeArea}>
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
    <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView>
            <ImageBackground
                style = {styles.backgroundImage}
                source = {require('../backgrounds/BG2.png')}
            >
            <View>
              <Text style={styles.field1}>First Name: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.first_Name}
                  onChangeText={ first_Name => this.handleFirstNameChange( first_Name ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Last Name: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.last_Name}
                  onChangeText={ last_Name => this.handleLastNameChange( last_Name ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Alternate Email:</Text>
              <TextInput
                  style={styles.textInput}
                  onChangeText={ alt_Email => this.handleAltEmailChange( alt_Email ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Phone Number: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.phone_Number}
                  onChangeText={ phone_Number => this.handlePhoneNumberChange( phone_Number ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Quote:</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.quote}
                  onChangeText={ quote => this.handleQuoteChange( quote ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Status: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.role}
                  onChangeText={ role => this.handleRoleChange( role ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field}>Payment: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.payment}
                  onChangeText={ payment => this.handlePaymentChange( payment ) }
                  underlineColorAndroid='transparent'
              />
                <View style = {styles.buttonView}>
                    <TouchableOpacity style = {styles.btn2} onPress={() => this.handleSubmit()}>
                        <Text style={styles.btntxt}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.btn3} onPress={() => this.props.navigation.navigate('Tools')}>
                                <Text style={styles.btntxt}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        height: '100%',
    },
    btn2: {
        backgroundColor: 'rgba(127,141,221,0.6)',
        width: '42.5%',
        marginRight: 10,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: '5%',
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btn3: {
        backgroundColor: 'rgba(127,141,221,0.6)',
        width: '42.5%',
        marginLeft: 10,
        borderWidth: 1,
        marginTop: 10,
        marginRight: '5%',
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btntxt: {
        color: 'white',
        fontSize: 18,
    },
    buttonView: {
        flex: 1,
        height: 150,
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
    imageStyle: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
        resizeMode: 'contain',
    },
      textInput: {
        height: 40,
        fontSize: 18,
        width: '90%',
        alignSelf: 'center',
        borderColor: 'white',
        backgroundColor: 'rgba(57,189,225,0.6)',
        borderWidth: 1,
        marginTop: 5,
        color: 'white',
      },
    safeArea: {
        backgroundColor: '#ddd'
    },
      scrollView: {
        backgroundColor: 'transparent',
        height: '100%',
      },
    field: {
        color: 'white',
        fontSize: 18,
        marginTop: 2,
        marginLeft: 20,
    },
    field1: {
      color: 'white',
      fontSize: 18,
      marginTop: 10,
      marginLeft: 20,
    },
});
