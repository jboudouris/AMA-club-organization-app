import React, { Component } from 'react';
import {  KeyboardAvoidingView, ImageBackground, Image, TouchableOpacity, View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
import PostComponent from '../components/PostComponent';
import { Avatar } from 'react-native-elements';

import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/post');
let addItem = (description, date, picture) => {
let valuekey = db.ref('/post').push().key;

  db.ref('/post/' + valuekey).update({
    description: description,
    date: new Date(),
    picture: picture,
    user: firebase.auth().currentUser.uid,
    key: valuekey,


  });
};
export default class List extends Component {
  state = {
    items: [],
    description: '',
    date: '',
    picture: '',
    key: '',
  };

  handleSubmit = () => {
    addItem(
      this.state.description,
      this.state.date,
      this.state.picture,
    );
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
      //}
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View>
         <View style  = {styles.header}>
            <View style = {{flex:1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                        source = {require('../icons/AMA_white.png')}
                    />
                </TouchableOpacity>
            </View>
         </View>
         <View style = {styles.container}>
                <ScrollView style={styles.scrollView}>
                    <ImageBackground
                        style = {styles.backgroundImage}
                        source = {require('../backgrounds/BG1.png')}
                    >
                    {this.state.items.length > 0 ? (
                      <PostComponent items={this.state.items} />
                      ) : (
                      <Text>No items</Text>
                    )}
                    </ImageBackground>
                </ScrollView>
                <View style={styles.textbar}>
                    <TextInput style={styles.txtInput} onChangeText={description => this.setState({ description })} />
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
  container: {
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: 'transparent',
    height: '80%',
  },
  backgroundImage: {
      flex: 1,
  },
  btn: {
      backgroundColor: '#cccccc',
      alignSelf: 'center',
      width: '15%',
      borderWidth: 1,
      margin: 5,
      borderColor: 'gray',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonText: {
      fontSize: 18,
      color: '#1b2f50',
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
  safeArea: {
      backgroundColor: '#fff'
  },
  textbar: {
      height: '10%',
      flexDirection:'row',
      backgroundColor: '#1b2f50',
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
  }
});
