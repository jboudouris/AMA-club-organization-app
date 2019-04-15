import React, { Component } from 'react';
import { ImageBackground, Image, TouchableOpacity, View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView } from 'react-native';
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
    alert('Success');
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
            <View style = {{paddingLeft: 10, flex:1, alignItems:'flex-start'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tools')}>
                    <Image
                        style = {{width: 35, height: 35, margin: 10}}
                        source = {require('../icons/gear_1.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style = {{flex:1}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        style = {{alignSelf: 'center', width: 150, height: 50, margin: 10}}
                        source = {require('../icons/AMA_white.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style = {{paddingRight: 10, flex:1, alignItems:'flex-end'}}>
                <TouchableOpacity
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
                    <Avatar rounded title="LM" />
                </TouchableOpacity>
            </View>
         </View>

         <ImageBackground
             style = {styles.backgroundImage}
             source = {require('../backgrounds/BG2.png')}
          >
            <View>
                <ScrollView style={styles.scrollView}>
                    {this.state.items.length > 0 ? (
                      <PostComponent items={this.state.items} />
                      ) : (
                      <Text>No items</Text>
                    )}
                </ScrollView>
                <TextInput style={styles.itemInput} onChangeText={description => this.setState({ description })} />
                <TouchableHighlight
                  style={styles.button}
                  underlayColor="white"
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  },
  scrollView: {
    height: 400,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
  },
  btn: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: 'rgba(255,255,255,0.5)',
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
      backgroundColor: '#39BDE1',
      flexDirection: 'row',
      alignItems: 'center',
  },
  headerAMA:  {
      backgroundColor: 'transparent',
      alignSelf: 'center',
      alignItems: 'center',

  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
});
