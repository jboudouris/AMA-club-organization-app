import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  SafeAreaView,
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
    alert('You already RSVP this event');
  }
  else {
    //alert(RSVP);
    key = db.ref('/userRSVP').child(eventName).push();
    db.ref('/userRSVP').child(eventName).push({
      name: name,
      eventName: eventName,
    });
     let attendantNum1 = attendantNum + 1;
     firebase.database().ref('user/' + currentUserUid).update({
     'attendantNum': attendantNum1
   });

    alert('RSVP Sucess');
  }



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
    // db.ref('/userRSVP').child(this.props.navigation.state.params.eventName).on('value', snapshot => {
    //   if (snapshot.exists() == true){
    //     let data = snapshot.val();
    //     let items = Object.values(data);
    //     for (let i=0; i< items.length; i++){
    //       if (items[i].name == this.state.name){
    //         //alert(items[i].name == this.state.name);
    //         this.setState({
    //           isRSVP: true
    //         });
    //         break;
    //       }
    //       else {
    //         this.setState({
    //           isRSVP: false
    //         });
    //       }
    //     }
    //   }
    //   //}
    // });
    }

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
    addItem(this.state.name, this.state.eventName, this.state.eventUKey, this.state.isRSVP,
            this.state.currentUserUid, this.state.attendantNum);
    //alert('Success');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
        <Text style={styles.title}>Text</Text>
        <Text style={styles.title}>{this.props.navigation.state.params.email}</Text>
        <Text style={styles.title}>{this.props.navigation.state.params.first_Name}</Text>
        <Text style={styles.title}>{this.props.navigation.state.params.eventName}</Text>
        <Text style={styles.title}>{this.props.navigation.state.params.eventUKey}</Text>
        <Text style={styles.title}>Attendant {this.props.navigation.state.params.attendantNum}</Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>RSVP</Text>
        </TouchableHighlight>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
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
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
});
