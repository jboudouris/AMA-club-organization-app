import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Button, View, Text, TextInput, SafeAreaView, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {KeyboardAvoidingView} from 'react-native';
let title1 = 'Chat';

export default class Home extends Component {
  static navigationOptions = {
   title: title1
 };

 constructor(props){
   super(props);
   this.state = {
     person: {
       email: this.props.navigation.state.params.email,
       first_Name: this.props.navigation.state.params.first_Name,
       userKey: this.props.navigation.state.params.userKey,
     },
     textMessage: '',
     messageList:[],
     page:1,
   }
 }

 handleSubmit = () => {
   if(this.state.textMessage.length > 0){
     let msgId = firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(this.state.person.userKey).push().key;
     let updates = {};
     let message = {
       message: this.state.textMessage,
       time: firebase.database.ServerValue.TIMESTAMP,
       from: firebase.auth().currentUser.email,
       to: this.props.navigation.state.params.email,
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

 renderRow = ({item}) => {
   return(
     <View style={{
       flexDirection: 'row',
       width: '60%',
       alignSelf: item.from === firebase.auth().currentUser.email ? 'flex-end' : 'flex-start',
       backgroundColor: item.from === firebase.auth().currentUser.email ? '#00897b' : '#7cb342',
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
                        <View style={styles.main}>
                            <FlatList
                                style={{padding: 10, height: height * 0.8}}
                                data={this.state.messageList}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index)=>index.toString()}
                                scrollToIndex={this.state.messageList.length -1 }
                            />
                            <KeyboardAvoidingView behavior="position" style={{paddingBottom: 15}}>
                                <View style={{ flexDirection:'row', alignItems: 'center' }}>
                                    <TextInput
                                    value={this.state.textMessage}
                                    placeholder="Type message..."
                                    onChangeText={textMessage => this.setState({ textMessage })}
                                    />
                                    <TouchableOpacity onPress={this.handleSubmit}>
                                        <Text> Send </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                         </View>
                    </ImageBackground>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
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
      backgroundColor: 'rgba(127,141,221,0.6)',
      alignSelf: 'center',
      width: '100%',
      borderWidth: 1,
      marginTop: 10,
      borderColor: 'white',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },
});