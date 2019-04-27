import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
} from 'react-native';

import { db } from '../config';
let itemsRef = db.ref('/event');

export default class AddItem extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    picture: '',
    RSVP: '',
    eventKey: '',
    eventUKey: '',
  };

  componentDidMount() {

    this.anotherFunc();
  }

  anotherFunc = () => {
    let date = this.props.navigation.state.params.date;
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      for (let i=0; i< items.length; i++)
      {
        if(items[i].date == date)
        {
          this.setState({
            name: items[i].name,
            date: items[i].date,
            time: items[i].time,
            location: items[i].location,
            description: items[i].description,
            picture: items[i].picture,
            RSVP: items[i].RSVP,
            eventKey: items[i].eventKey,
            eventUKey: items[i].key,
          });
        }
      }
    });
}



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
         <Text style={styles.txt2}>Name</Text>
        <Text style={styles.txt1}>{this.state.name}</Text>
        <Text style={styles.txt2}>Date</Text>
        <Text style={styles.txt1}>{this.state.date}</Text>
        <Text style={styles.txt2}>Time</Text>
        <Text style={styles.txt1}>{this.state.time}</Text>
        <Text style={styles.txt2}>Location</Text>
        <Text style={styles.txt1}>{this.state.location}</Text>
        <Text style={styles.txt2}>Description</Text>
        <Text style={styles.txt1}>{this.state.description}</Text>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {this.props.navigation.navigate('RSVP', {
                  email: this.props.navigation.state.params.email,
                  first_Name: this.props.navigation.state.params.first_Name,
                  last_Name: this.props.navigation.state.params.last_Name,
                  role: this.props.navigation.state.params.role,
                  currentUserUid: this.props.navigation.state.params.currentUserUid,
                  full_Name:this.props.navigation.state.params.full_Name,
                  eventName: this.state.name,
                  eventUKey: this.state.eventUKey,
                  attendantNum: this.props.navigation.state.params.attendantNum,
                });
              }}
        >
            <Text style={styles.btntxt}>RSVP details</Text>
        </TouchableOpacity>
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

        width: '90%',
        borderWidth: 1,

        borderColor: 'white',
        height: 50,
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
