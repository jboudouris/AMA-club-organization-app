import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
import Swiper from 'react-native-swiper';
import { Avatar } from 'react-native-elements';
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
  };
  logout(){
    firebase.auth().signOut();
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
            alt_Email: items[i].alt_Email,
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
                full_Name: this.state.first_Name  + this.state.last_Name,
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
       <SafeAreaView style={styles.safeArea}>
       <View style = {styles.columnView}>
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
            <View>
             <ScrollView style = {{backgroundColor: 'transparent'}}>
                 <View style = {styles.buttonView}>
                        <TouchableOpacity style={styles.btn}
                              onPress={() => {this.props.navigation.navigate('ViewAllPost', {
                                    full_Name: this.state.full_Name,
                              });
                              }}
                        >
                            <Image style={styles.imageStyle}
                                source={require('../icons/Archives.png')}
                             />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.btn}
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
                        >
                            <Avatar
                                size="xlarge"
                                title={this.state.first_Name[0] + this.state.last_Name[0]}
                                containerStyle={{flex:1, width: '100%'}}
                                overlayContainerStyle={{        backgroundColor: 'rgba(45,78,134,0.9)',}}
                                activeOpacity={0.8}
                            />
                        </TouchableOpacity>
                </View>
                 <View style = {styles.buttonView}>
                        <TouchableOpacity
                            style = {styles.btn}
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
                        >
                            <Image style={styles.imageStyle}
                                source={require('../icons/Calendar.png')}
                             />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.btn}
                            onPress={() => {this.props.navigation.navigate('ListEvent', {
                               first_Name: this.state.first_Name,
                               last_Name: this.state.last_Name,
                               role: this.state.role,
                               currentUserUid: this.state.currentUserUid,
                               full_Name: this.state.full_Name,
                               attendantNum: this.state.attendantNum,
                            });
                            }}
                        >
                            <Image style={styles.imageStyle}
                                source={require('../icons/Events.png')}
                             />
                        </TouchableOpacity>
                 </View>
                  <View style = {styles.buttonView}>
                         <TouchableOpacity
                             style = {styles.btn}
                             onPress={() => {this.props.navigation.navigate('Inbox', {
                                   email: this.state.email,
                                   first_Name: this.state.first_Name,
                                   last_Name: this.state.last_Name,
                                   role: this.state.role,
                                   currentUserUid: this.state.currentUserUid,
                                   full_Name: this.state.full_Name,
                                   attendantNum: this.state.attendantNum,
                             });
                             }}
                         >
                            <Image style={styles.imageStyle}
                                source={require('../icons/Chat.png')}
                             />
                         </TouchableOpacity>
                         <TouchableOpacity
                             style = {styles.btn}
                             onPress={() => {this.props.navigation.navigate('ViewAllUser', {
                                first_Name: this.state.first_Name,
                                last_Name: this.state.last_Name,
                                role: this.state.role,
                                attendantNum: this.state.attendantNum,
                                full_Name: this.state.full_Name,
                             });
                             }}
                         >
                            <Image style={styles.imageStyle}
                                source={require('../icons/Members.png')}
                             />
                         </TouchableOpacity>
                  </View>
                  <View style = {styles.buttonView}>
                           <TouchableOpacity
                               style = {styles.btn}
                               onPress={() => {this.props.navigation.navigate('Tools', {
                                   email: this.state.email,
                                   first_Name: this.state.first_Name,
                                   last_Name: this.state.last_Name,
                                   role: this.state.role,
                                   alt_Email: this.state.alt_Email,
                                   currentUserUid: this.state.currentUserUid,
                                   full_Name: this.state.full_Name,
                                   attendantNum: this.state.attendantNum,
                                   phone_Number: this.state.phone_Number,
                                   quote: this.state.quote,
                               });
                               }}
                           >
                                <Image style={styles.imageStyle}
                                    source={require('../icons/Info.png')}
                                 />
                           </TouchableOpacity>
                           <TouchableOpacity
                               style = {styles.btn}
                               onPress={() => this.logout()}
                           >
                               <Image style={styles.imageStyle}
                                   source={require('../icons/Logout.png')}
                                />
                           </TouchableOpacity>
                  </View>
            </ScrollView>
            </View>
        </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
    },
    btn: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0)',
        margin: 15,
    },
    buttonView: {
        flex: 1,
        height: 200,
        flexDirection:'row',
        backgroundColor: 'transparent',
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
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    }
});
