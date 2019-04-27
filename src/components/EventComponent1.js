import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { db } from '../config';
let itemsRef = db.ref('/event');

export default class ItemComponent extends Component {
  state = {
    number: '1',
  };


 static propTypes = {
   items: PropTypes.array.isRequired,
   keys: PropTypes.array.isRequired
 };

 handleSubmit = () => {
 };


 count = (eventName) =>  {
     var num = 0;
     let attend = db.ref('/userRSVP/' + eventName);
     attend.once('value', snapshot => {
         if (snapshot.exists()){
          let data = snapshot.val();
          let items = Object.values(data);
          //items.length is the number of people attend the event
          //the problem with the code below is it does not assign the value
          //to variable num.
          num = items.length;
          //the "return num" does not work for some reason.
          return num;
        }
     });
     //this will return the num=0 above.
     return num;
 }

 count1 = (eventName) => {
   let itemsRef1 = db.ref('/userRSVP');
   itemsRef1.child(eventName).once('value').then(function(snapshot) {
     if (snapshot.exists() == true ){
     let data = snapshot.val();
     let items = Object.values(data);
      return items.length;
     }
   });

   return 'this';
 }

 deleteEvent = (eventKey) => {
   itemsRef.on('value', snapshot => {
     let data = snapshot.val();
     let items = Object.values(data);
     let notFound = false;
     let key = '';
     for (let i=0; i< items.length; i++){
       if (items[i].key == eventKey)
       {
         let toRemove = '/event/' + eventKey;
         db.ref(toRemove).remove();
         //alert('success');
         break
       }
       else
       {
       }
     }

   });
 }
 render() {
   return (
     <View style={styles.itemsList}>
       {this.props.items.map((item, index) => {
         return (
           <View key={index}>
             <View style={{flex:1, flexDirection:'row', height: '10%'}}>
               <View style={{flex:2}}>
                   <TouchableOpacity
                     style={styles.event}
                     onPress={() => {this.props.navigation.navigate('EventDetail', {
                        name: item.name,
                        date: item.date,
                          full_Name: this.props.navigation.state.params.full_Name,
                          email: this.props.navigation.state.params.email,
                          first_Name: this.props.navigation.state.params.first_Name,
                          last_Name: this.props.navigation.state.params.last_Name,
                          currentUserUid: this.props.navigation.state.params.currentUserUid,
                          attendantNum: this.props.navigation.state.params.attendantNum,
                     });
                     }}
                   >
                       <Text style={styles.itemtext1}> {item.name} </Text>
                       <Text style={styles.itemtext2}> {item.time} </Text>
                   </TouchableOpacity>
               </View>
               <View style={{flex:1}}>
                   <TouchableOpacity
                       style={styles.btn}
                       onPress={() => {this.props.navigation.navigate('EditEvent', {
                          eventName: item.name,
                          
                       });
                       }}
                   >
                       <Text style = {styles.itemtext}> Edit </Text>
                   </TouchableOpacity>
               </View>
             </View>

           </View>
         );
       })}
     </View>
   );
 }
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'rgba(45,78,134,1)',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemtext: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    },
    itemtext1: {
        fontSize: 20,
        marginLeft: 3,
        color: 'white',
    },
    itemtext2: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        marginBottom: 3,
    },
    itemtext3: {
        fontSize: 20,
        marginLeft: 3,
        color: 'white',
        alignSelf: 'center',
        alignSelf: 'center',
    },
    itemtext4: {
        fontSize: 14,
        color: 'white',
        marginLeft: 5,
        marginBottom: 3,
        alignSelf: 'center',
    },
    event: {
        backgroundColor: 'rgba(45,78,134,0.8)',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 1,
    },
    event1: {
        backgroundColor: 'rgba(45,78,134,0.6)',
        borderColor: 'rgba(0,0,0,.3)',
        borderWidth: 1,
        flex: 1,
    },
});
