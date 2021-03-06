import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';

import {Picker, ImageBackground, Image, KeyboardAvoidingView, ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Button, SafeAreaView, StyleSheet, CameraRoll, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');
let valuekey = '';

import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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

let uploadImage = (uri, mime = 'images/', name) => {

  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    const { currentUser } = firebase.auth();
    const imageRef = firebase.storage().ref('images').child(currentUser);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime, name: name });
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error)
      })
    })
  };

export async function request_location_runtime_permission() {

  try {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    alert('You can use the camera');
  } else {
    alert('Camera permission denied');
  }
} catch (err) {
  console.warn(err);
}
}

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
    photos: [],
    avatarSource: null,
 }

//Call mark function
 async componentDidMount(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      for (let i=0; i< items.length; i++)
      {
        if(items[i].userKey == this.props.navigation.state.params.currentUserUid)
        {
          this.setState({
            email: items[i].email,
            first_Name: items[i].first_Name,
            last_Name: items[i].last_Name,
            role: items[i].role,
            full_Name: items[i].first_Name + ' ' + items[i].last_Name,
            currentUserUid: items[i].userKey,
            attendantNum: items[i].attendantNum,
            phone_Number: items[i].phone_Number,
            quote: items[i].quote,
            payment: items[i].payment,
          });
          break;
        }
      }
    });

    await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: 'Cool Photo App Camera Permission',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
  await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA,
  {
    title: 'Cool Photo App Camera Permission',
    message:
      'Cool Photo App needs access to your camera ' +
      'so you can take awesome pictures.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  },
);
await PermissionsAndroid.request(
PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
{
  title: 'Cool Photo App Camera Permission',
  message:
    'Cool Photo App needs access to your camera ' +
    'so you can take awesome pictures.',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
},
);
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
  _handleButtonPress = () => {
       ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
           alert('User cancelled image picker');
         } else if (response.error) {
           alert('ImagePicker Error: '+ response.error);
         } else if (response.customButton) {
           alert('User tapped custom button: '+ response.customButton);
         } else {
           const source = { uri: response.uri };

           this.setState({
             avatarSource: source,
           });

         }
      });
  };

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
    uploadImage(this.state.avatarSource, 'hello');
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
        <View>
            <ImageBackground
                style = {styles.backgroundImage}
                source = {require('../backgrounds/BG2.png')}
            >
            <View>
              <Text style={styles.field2}>Enter information below to update your profile, or cancel.</Text>
              <View style = {styles.buttonView2}>
                  <TouchableOpacity style = {styles.btn2} onPress={this._handleButtonPress}>
                              <Text style={styles.btntxt}>Upload Profile Pic</Text>
                  </TouchableOpacity>
              </View>
              <Image
                style={{
                  width: 150,
                  height: 150,
                }}
                source={this.state.avatarSource}
                />
              <Text style={styles.field1}>First Name: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.first_Name}
                  placeholderTextColor='white'
                  onChangeText={ first_Name => this.handleFirstNameChange( first_Name ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Last Name: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.last_Name}
                  placeholderTextColor='white'
                  onChangeText={ last_Name => this.handleLastNameChange( last_Name ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Alternate Email:</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.alt_Email}
                  placeholderTextColor='white'
                  onChangeText={ alt_Email => this.handleAltEmailChange( alt_Email ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Phone Number: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.phone_Number}
                  placeholderTextColor='white'
                  onChangeText={ phone_Number => this.handlePhoneNumberChange( phone_Number ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Quote:</Text>
              <TextInput
                  style={styles.textInput1}
                  placeholder={this.props.navigation.state.params.quote}
                  placeholderTextColor='white'
                  multiline={true}
                  onChangeText={ quote => this.handleQuoteChange( quote ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Status: </Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={this.props.navigation.state.params.role}
                  placeholderTextColor='white'
                  onChangeText={ role => this.handleRoleChange( role ) }
                  underlineColorAndroid='transparent'
              />
              <Text style={styles.field1}>Payment: </Text>
                <Picker
                    selectedValue={this.state.payment}
                    style={styles.textInput}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      payment: itemValue
                    })
                    }>
                    <Picker.Item label="Paid" value= "Paid" />
                    <Picker.Item label="Unpaid" value= "Unpaid" />
                </Picker>

                <View style = {styles.buttonView}>
                    <TouchableOpacity style = {styles.btn2} onPress={() => this.props.navigation.navigate('Tools')}>
                                <Text style={styles.btntxt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.btn3} onPress={() => this.handleSubmit()}>
                        <Text style={styles.btntxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </View>
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
        backgroundColor: 'rgba(45,78,134,0.7)',
        width: '42.5%',
        marginRight: 10,
        borderWidth: 1,

        marginLeft: '5%',
        borderColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btn3: {
        backgroundColor: 'rgba(45,78,134,0.7)',
        width: '42.5%',
        marginLeft: 10,
        borderWidth: 1,

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
        height: 200,
        flexDirection:'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    buttonView2: {
      paddingTop:35,
        flex: 1,
        height: 0,
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
    textInput1: {
      height: 100,
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
        alignSelf: 'stretch',
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
        field2: {
          color: 'white',
          fontSize: 18,
          marginTop: 10,
          marginLeft: 20,
        },
});
