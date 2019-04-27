import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
let addItem = (name, eventName, eventUKey, isRSVP, currentUserUid, attendantNum) => {
  let RSVP;
  db.ref('/userRSVP').child(eventName).on('value', snapshot => {
    if (snapshot.exists() == true){
      let data = snapshot.val();
      let items = Object.values(data);
      for (let i=0; i< items.length; i++){
        if (items[i].name == name){
          RSVP = true;
          break;
        }
        else {
          RSVP = false;
        }
      }
    }
    //}
  });
  if (RSVP == true){
    alert('You are already RSVP\'d to this event');
  }
  else {
    //alert(RSVP);
    // let valuekey = db.ref('/event').push().key;
    //
    //   db.ref('/event/' + valuekey).update({
    //     name: name,
    //     date: date,
    //     time: time,
    //     location: location,
    //     description: description,
    //     picture: picture,
    //     RSVP: RSVP,
    //     eventKey: eventKey,
    //     key: valuekey,
    //
    //   });
    // };
    key = db.ref('/userRSVP').child(eventName).push().key;
    db.ref('/userRSVP/' + eventName +'/' + key ).update({
      name: name,
      eventName: eventName,
      key: key,
    });
     let attendantNum1 = attendantNum + 1;
     firebase.database().ref('user/' + currentUserUid).update({
     'attendantNum': attendantNum1
   });
    //alert('RSVP Sucess');
  }
};
 let removeItem = (name, eventName, eventUKey, isRSVP, currentUserUid, attendantNum) => {
   let RSVP;
   let key = '';
   db.ref('/userRSVP').child(eventName).on('value', snapshot => {
     if (snapshot.exists() == true){
       let data = snapshot.val();
       let items = Object.values(data);
       for (let i=0; i< items.length; i++){
         if (items[i].name == name){
           key = items[i].key
           break;
         }
         else {
         }
       }
     }
     //}
   });
     //alert(RSVP);
     let toRemove = '/userRSVP/' + eventName + '/' + key;
     db.ref(toRemove).remove();
      let attendantNum1 = attendantNum + 1;
      firebase.database().ref('user/' + currentUserUid).update({
      'attendantNum': attendantNum1
    });
     //alert('RSVP Sucess');
   };
export default class AddItem extends Component {
  state = {
    name: '',
    eventName: '',
    email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    currentUserUid: '',
    full_Name: '',
    eventUKey: '',
    attendantNum: '',
    isRSVP: false,
    rsvpButton: 'RSVP',
  };
  componentDidMount() {
    this.setState({
      name: this.props.navigation.state.params.full_Name,
      eventName: this.props.navigation.state.params.eventName,
      email: this.props.navigation.state.params.email,
      first_Name: this.props.navigation.state.params.first_Name,
      last_Name: this.props.navigation.state.params.last_Name,
      role: this.props.navigation.state.params.role,
      currentUserUid: this.props.navigation.state.params.currentUserUid,
      full_Name: this.props.navigation.state.params.full_Name,
      eventUKey: this.props.navigation.state.params.eventUKey,
      attendantNum: this.props.navigation.state.params.attendantNum,
    });
    db.ref('/userRSVP').child(this.props.navigation.state.params.eventName).on('value', snapshot => {
      if (snapshot.exists() == true){
        let data = snapshot.val();
        let items = Object.values(data);
        for (let i=0; i< items.length; i++){
          if (items[i].name == this.state.name){
            this.setState({
              rsvpButton: "UnRSVP"
            });
            break;
          }
          else {
            this.setState({
              rsvpButton: "RSVP"
            });
          }
        }
      }
      //}
    });
    }
  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    if (this.state.rsvpButton == 'RSVP'){
    addItem(this.state.name, this.state.eventName, this.state.eventUKey, this.state.isRSVP,
            this.state.currentUserUid, this.state.attendantNum);
      this.setState({
        rsvpButton: "UnRSVP"
      });
    }
    if (this.state.rsvpButton== 'UnRSVP'){
      removeItem(this.state.name, this.state.eventName, this.state.eventUKey, this.state.isRSVP,
              this.state.currentUserUid, this.state.attendantNum);
        this.setState({
          rsvpButton: "RSVP"
        });
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
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
            <TouchableHighlight
              style={styles.btn1}
              underlayColor="white"
              onPress={() => {this.props.navigation.navigate('RSVPList', {
                                         eventName: this.state.eventName,
                                       });
                                     }}
            >
              <Text style={styles.btntxt}>RSVP List</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.btn1}
              underlayColor="white"
              onPress={this.handleSubmit}
            >
              <Text style={styles.btntxt}>{this.state.rsvpButton}</Text>
            </TouchableHighlight>
         </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
    btntxt: {
        fontSize: 18,
        color: 'white',
    },
    btn1: {
        backgroundColor: 'rgba(45,78,134,0.7)',
        alignSelf: 'center',

        width: '100%',
        borderWidth: 1,

        borderColor: 'white',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
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
    txt1: {
        fontSize: 30,
        marginBottom: 15,
        alignSelf: 'center',
        color: 'black',
    },
    txt2: {
        fontSize: 20,
        marginTop: 5,

        alignSelf: 'center',
        color: 'black',
    },
});
