import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
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
      if (snapshot.exists() == true){
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
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Chat', {
                email: item.email,
                first_Name: "item.first_Name",
                otherfull_Name: item.to,
                user: firebase.auth().currentUser.email,
                userKey: item.otherUserKey,
              });
            }}
          >
            <View>
              <Text style={styles.itemtext1}>{item.to}</Text>
              <Text style={styles.itemtext2}>{item.message}</Text>
            </View>
          </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
         <View style={styles.header}>
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
                <View style={{flex:1}}>
                    <FlatList
                      style={{height: '100%', flexDirection: 'column'}}
                      data={this.state.otherUser}
                      renderItem={this.renderRow}
                      keyExtractor={(item, index)=>index.toString()}
                    />
                </View>
              </ImageBackground>
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
        backgroundColor: 'rgba(45,78,134,1)',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.2)',
        alignItems: 'center',
        justifyContent: 'center',
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
});
