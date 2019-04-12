import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import InboxUserComponent from '../components/InboxUserComponent';
import firebase from 'firebase';
import { db } from '../config';

export default class AddItem extends Component {
  state = {
    description: '',
    date: '',
    picture: '',
    key: '',
    otherUser: [],
  };


  componentDidMount(){
    let otherUserList = [];
    firebase.database().ref('messages').child(firebase.auth().currentUser.uid).on('value', snapshot => {
      let childrenKey = [];
      let data = snapshot.val();
      let items = Object.values(data);
      var key1 = Object.keys(snapshot.val())[0];
      //alert(key);
      // alert(key1);
      //get all otherUser uniqueKey
      for (let i=0; i<items.length; i++){
        childrenKey.push(Object.keys(snapshot.val())[i]);
      }
      // this.setState({
      //   otherUser: items
      // });
      if (childrenKey.length != 0){
        for (let j=0; j< childrenKey.length; j++){
          firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(childrenKey[j]).limitToLast(1).on('value', snapshot => {

            let data = snapshot.val();
            let items = Object.values(data);
            for (let i=0; i<items.length; i++){
              //alert(items[i].to + " from " + items[i].from + " message" + items[i].message + " time " + items[i].time );
              otherUserList.push(items[i]);
            }
            this.setState({
              otherUser: otherUserList
            });

          });
        }

      }
    });

  }

  componentWillReceiveProps(){
    if (this.props.navigation.state.params.refresh){
      let otherUserList = [];
      firebase.database().ref('messages').child(firebase.auth().currentUser.uid).on('value', snapshot => {
        let childrenKey = [];
        let data = snapshot.val();
        let items = Object.values(data);
        var key1 = Object.keys(snapshot.val())[0];
        //alert(key);
        // alert(key1);
        //get all otherUser uniqueKey
        for (let i=0; i<items.length; i++){
          childrenKey.push(Object.keys(snapshot.val())[i]);
        }
        // this.setState({
        //   otherUser: items
        // });
        if (childrenKey.length != 0){
          for (let j=0; j< childrenKey.length; j++){
            firebase.database().ref('messages').child(firebase.auth().currentUser.uid).child(childrenKey[j]).limitToLast(1).on('value', snapshot => {

              let data = snapshot.val();
              let items = Object.values(data);
              for (let i=0; i<items.length; i++){
                //alert(items[i].to + " from " + items[i].from + " message" + items[i].message + " time " + items[i].time );
                otherUserList.push(items[i]);
              }
              this.setState({
                otherUser: otherUserList
              });

            });
          }

        }
      });
    }
  }

  renderRow = ({item}) => {
    return(
      <View>
      <TouchableHighlight
        style={styles.button}
        underlayColor="black"
        onPress={() => {
          this.props.navigation.navigate('Chat', {
            email: item.email,
            first_Name: "item.first_Name",
            user: firebase.auth().currentUser.email,
            userKey: item.otherUserKey,
            to: "to",

          });

        }}

      >
      <Text> {item.to} " " {item.message}</Text>
      </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View>
      <Text> {this.props.navigation.state.params.refresh} </Text>
      <SafeAreaView>
        <FlatList
          data={this.state.otherUser}
          renderItem={this.renderRow}
          keyExtractor={(item, index)=>index.toString()}
        />
      </SafeAreaView>
      </View>
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
  }
});
