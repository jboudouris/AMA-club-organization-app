import React, { Component } from 'react';
import {
View,
Text,
TouchableOpacity,
StyleSheet,
TextInput,
ScrollView,
} from 'react-native';
import UserComponent from '../components/UserComponent_2';
import { db } from '../config';
let itemsRef = db.ref('/user');

export default class deleteUsers extends Component {
state = {
  items: [],
  userList: [],
}

componentDidMount() {
let execArr = [];
let userArr = [];
itemsRef.on('value', snapshot => {
  let data = snapshot.val();
  let items = Object.values(data);
  if (items.length > 0 ){
      for (let i=0; i<items.length; i++){
        if (items[i].role == 'exec'){
          execArr.push(items[i]);
        }
        else {
          userArr.push(items[i]);
        }
      }
  }

  this.setState({
    items: execArr
  });

  this.setState({
    userList: userArr
  });
});
}

deleteUsers(){
  let deleteList = [];
  for (var i = 0; i < items.length; i++){
    if (items.value == true){
      deleteList.push(items.uid);
    }
  }
  for (var j = 0; j < deleteList.length; j++){
    let toRemove = '/user/' + deleteList[i];
    db.ref(toRemove).remove();
  }
}

handleSubmit = () => {
  itemsRef.on('value', snapshot => {
    // let uniqueID = firebase.auth().currentUser.uid;//to get the unique user id from
    //firebase, but not used anywhere in the code
    //find out name related to the current user ID in Question
    //run a while loop till the account related to the userID or name
    //found, delete that account
    // let data = snapshot.val();
    // let items = Object.values(data);
    // let notFound = false;
    // let key = '';
    // for (let i=0; i < items.length; i++){
    //   if (items[i].name == uniqueID)
    //   {
    //     key = items[i].key;
    //     let toRemove = '/user/' + key;//copied from DeleteEvent only chnge made
    //     db.ref(toRemove).remove();//was changed '/event/' to '/account/'
    //     //alert('success');
    //     break;
    //   }
    //   else
    //   {
    //   }
    // }
  //
   });
 };
render() {
  return (
    <View>
        <View>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}> Executive Members </Text>
                    {this.state.items.length > 0 ? (
                      <UserComponent items={this.state.items} />
                      ) : (
                      <Text>No items</Text>
                    )}
                    <Text style={styles.title}> Club Members </Text>
                    {this.state.userList.length > 0 ? (
                      <UserComponent items={this.state.userList} />
                      ) : (
                      <Text>No items</Text>
                    )}
                  </ScrollView>

        </View>


        <View style={styles.buttonView}>
            <TouchableOpacity
                style = {styles.btn}
                onPress={() => this.deleteUsers()}
            >
                <Text style={styles.btntxt}>Delete Users</Text>
            </TouchableOpacity>
        </View>
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
btn: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: 5,
},
    btntxt: {
        alignSelf: 'center',
        marginTop: 25,
        color: 'rgba(0,0,0,.8)',
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonView: {
        flex: 1,
        height: 100,
        flexDirection:'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
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