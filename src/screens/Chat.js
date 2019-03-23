import React, { Component } from 'react';
import { Button, View, Text, TextInput, SafeAreaView, FlatList } from 'react-native';
import firebase from 'firebase';
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
   }
 }

 handleSubmit = () => {
   if(this.state.textMessage.length > 0){
     let msgId = firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(this.state.person.userKey).push().key;
     let updates = {};
     let message = {
       message: this.state.textMessage,
       time: firebase.database.ServerValue.TIMESTAMP,
       from: firebase.auth().currentUser.email
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
      <Text> {item.time} </Text>
      </View>
   )
 }
  render() {
    return (
      <View>
        <TextInput
          style={{}}
          onChangeText={textMessage => this.setState({ textMessage })}
          placeholder="Message"
        />
        <Button
          title="Send"
          color="green"
          onPress={this.handleSubmit}
        />
       <Text>{this.props.navigation.state.params.email}</Text>
       <Text>{this.props.navigation.state.params.user}</Text>
       <Text>{this.props.navigation.state.params.first_Name}</Text>
      <Text>{this.props.navigation.state.params.userKey}</Text>
      <SafeAreaView>
        <FlatList
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index)=>index.toString()}
        />
      </SafeAreaView>
     </View>
    );
  }
}
