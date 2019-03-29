import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
let itemsRef = db.ref('/user');

export default class Home extends Component {
  state = {
    email: '',
    first_Name: '',
    last_Name: '',
    role: '',
    currentUserUid: '',
    full_Name: '',
    attendantNum: '',
    cond: 'true',
    phone_Number: '',
    quote: '',
    payment: '',
  };
  logout(){
    firebase.auth().signOut();
  }

  logout1(){
    alert(this.state.currentUserUid);
  }

  logout2(){
    alert(firebase.auth().currentUser.emailVerified);
  }
  componentDidMount(){
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      for (let i=0; i< items.length; i++)
      {
        if(items[i].userKey == firebase.auth().currentUser.uid)
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
          });
          break;
        }
      }
    });
  }
  logout3(){
    alert(
          'email: ' + this.state.email + '\n' +
          'firstName: ' + this.state.first_Name + '\n' +
          'lastName: ' + this.state.last_Name + '\n' +
          'fullName: ' + this.state.full_Name + '\n' +
          'role: ' + this.state.role + '\n' +
          'attendantNum: ' + this.state.attendantNum + '\n' +
          'userUid: ' + this.state.currentUserUid

        );
  }

  renderElement(){
   if(this.state.role == 'user'){
      return <Button
        title="Go to Calender"
        onPress={() => {this.props.navigation.navigate('Calender', {
                email: this.state.email,
                first_Name: this.state.first_Name,
                last_Name: this.state.last_Name,
                role: this.state.role,
                currentUserUid: this.state.currentUserUid,
                full_Name: this.state.full_Name,
                attendantNum: this.state.attendantNum,
              });
            }}
      />;
    }
  else if (this.state.role == 'admin') {
   return <Button
     title="Create Event"
     onPress={() => this.props.navigation.navigate('CreateEvent')}
   />;
 }
 return null;
}
  render() {
    return (
      <View>
        <Button
            title="Archives"
            onPress={() => this.props.navigation.navigate('ViewAllPost')}
        />
        <Button
            title="Profile"
            onPress={() => {this.props.navigation.navigate('Profile', {
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
            }}
        />
        <Button
            title="Calendar"
            onPress={() => {this.props.navigation.navigate('Calender', {
               email: this.state.email,
               first_Name: this.state.first_Name,
               last_Name: this.state.last_Name,
               role: this.state.role,
               currentUserUid: this.state.currentUserUid,
               full_Name: this.state.full_Name,
               attendantNum: this.state.attendantNum,
             });
           }}
        />
       <Button
         title="Create Event"
         onPress={() => this.props.navigation.navigate('CreateEvent')}
       />
       <Button
         title="List Event"
         onPress={() => this.props.navigation.navigate('ListEvent')}
       />
       <Button
         title="Delete Event"
         onPress={() => this.props.navigation.navigate('DeleteEvent')}
       />
       <Button
         title="Edit Event"
         onPress={() => this.props.navigation.navigate('EditEvent')}
       />
       <Button
         title="View All User"
         onPress={() => this.props.navigation.navigate('ViewAllUser')}
       />
      <Button
        title="Log out"
        onPress={() => this.logout()}
      />
     </View>
    );
  }
}
