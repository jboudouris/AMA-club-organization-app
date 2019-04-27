import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Button, View, Text, TextInput, SafeAreaView, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { db } from '../config';
import {KeyboardAvoidingView} from 'react-native';
let title1 = 'Chat';
let itemsRef = db.ref('/user');
export default class Home extends Component {
  static navigationOptions = {
   title: title1
 };

 constructor(props){
   super(props);
   this.state = {
     person: {
       email: this.props.navigation.state.params.email,
       otherfull_Name: this.props.navigation.state.params.otherfull_Name,
       userKey: this.props.navigation.state.params.userKey,
     },
     full_Name: '',
     textMessage: '',
     messageList:[],
   }
 }

 handleSubmit = () => {
   itemsRef.on('value', snapshot => {
         let data = snapshot.val();
         let items = Object.values(data);
         for (let i=0; i< items.length; i++)
         {
           if(items[i].userKey ==  this.state.person.userKey)
           {
             this.setState({
               other_Name: items[i].full_Name,
             });
             break;
           }
         }
       });
   if(this.state.textMessage.length > 0){
     let msgId = firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(this.state.person.userKey).push().key;
     let updates = {};
     let message = {
       message: this.state.textMessage,
       time: firebase.database.ServerValue.TIMESTAMP,
       from: this.state.full_Name,
       to: this.state.person.otherfull_Name,
       otherUserKey: this.state.person.userKey,
       email: this.props.navigation.state.params.email,
     }
     updates['messages/'+ firebase.auth().currentUser.uid + '/' + this.state.person.userKey + '/' + msgId] = message;
     updates['messages/'+ this.state.person.userKey + '/' + firebase.auth().currentUser.uid + '/' + msgId] = message;
     firebase.database().ref().update(updates);
     this.setState({ textMessage: ''});
   }

 };

 componentWillMount(){
   firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(this.state.person.userKey).on('child_added', (value)=>{
     this.setState((prevState)=>{
       return {
         messageList: [...prevState.messageList, value.val()]
       }
     })
   })
 }

 componentDidMount(){
   let some_Name = '';
   itemsRef.on('value', snapshot => {
         let data = snapshot.val();
         let items = Object.values(data);
         for (let i=0; i< items.length; i++)
         {
           if(items[i].userKey ==  firebase.auth().currentUser.uid)
           {
             this.setState({
               full_Name: items[i].first_Name + ' ' + items[i].last_Name,
             });

             break;
           }
         }
       });
 }

 renderRow = ({item}) => {
   return(
     <View style={{
       flexDirection: 'row',
       width: '60%',
       alignSelf: item.from === firebase.auth().currentUser.full_Name ? 'flex-end' : 'flex-start',
       backgroundColor: item.from === firebase.auth().currentUser.full_Name ? '#00897b' : '#7cb342',
       borderRadius: 5,
       marginBottom:10
     }}>
      <Text style={{color:'#fff'}}> {item.message} </Text>
      <Text> {this.convertTime(item.time)} </Text>
      </View>
   )
 }
  convertTime = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()){
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  }

GoTo_bottom_function =()=>{

    this.refs.FlatList1.scrollToEnd({animated: true});

 }

  render() {
    let {height, width} = Dimensions.get('window');
    return (
        <SafeAreaView>
            <View>
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

            <View style={styles.body}>
                <ImageBackground
                    style = {styles.backgroundImage}
                    source = {require('../backgrounds/BG2.png')}
                >
              <FlatList
                  style={{flex: 1, padding: 10, width: '100%', height: '100%'}}
                  data={this.state.messageList}
                  renderItem={this.renderRow}
                  keyExtractor={(item, index)=>index.toString()}
                  scrollToIndex={this.state.messageList.length -1 }
              />
              </ImageBackground>
                <View style={styles.textbar}>
                    <TextInput style={styles.txtInput} onChangeText={description => this.setState({ textMessage })} />
                    <TouchableOpacity
                      style={styles.btn}
                      underlayColor="white"
                      onPress={this.handleSubmit}
                    >
                      <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>



            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: '90%',
    width: '100%',
  },
  main: {
    height: '100%',
    alignSelf: 'stretch',
    flexDirection: 'column',
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
  txtInput:  {
      marginLeft: 5,
      height: 40,
      alignSelf: 'center',
      width: '85%',
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: 'gray',
      borderWidth: 1,
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
      height: '100%',
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
  btn: {
      backgroundColor: 'rgba(45,78,134,1)',
      alignSelf: 'center',
      width: '15%',
      borderWidth: 1,
      margin: 5,
      borderColor: 'rgba(255,255,255,.6)',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
    textbar: {
        height: '10%',
        flexDirection:'row',
        backgroundColor: '#1b2f50',
    },
});
