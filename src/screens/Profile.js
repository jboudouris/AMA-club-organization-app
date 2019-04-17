import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';
import { Image, View, Modal, Text, TouchableOpacity, Button, SafeAreaView, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-elements';
import { db } from '../config';
import firebase from 'firebase';
let itemsRef = db.ref('/user');

export default class Profile extends Component {
  state = {
      email: '',
      first_Name: '',
      last_Name: '',
      role: '',
      currentUserUid: '',
      full_Name: '',
      attendantNum: '',
      phone_Number: '',
      quote: '',
  }

//Call mark function
  componentDidMount() {
    this.setState({
      email: this.props.navigation.state.params.email,
      first_Name: this.props.navigation.state.params.first_Name,
      last_Name: this.props.navigation.state.params.last_Name,
      role: this.props.navigation.state.params.role,
      currentUserUid: this.props.navigation.state.params.currentUserUid,
      full_Name: this.props.navigation.state.params.full_Name,
      attendantNum: this.props.navigation.state.params.attendantNum,
      phone_Number: this.props.navigation.state.params.phone_Number,
      quote: this.props.navigation.state.params.quote,
    });
  itemsRef.on('value', snapshot => {
    let email = this.props.navigation.state.params.email;
    let data = snapshot.val();
    let items = Object.values(data);
    for (let i = 0; i < items.length; i++)
    {
      if(items[i].email == email)
      {

        this.setState({item: items[i]});

        break;
      }
    }
  });
}

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.columnView}>
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

           <Avatar
               rounded size="xlarge"
               title={this.state.first_Name[0] + this.state.last_Name[0]}
               containerStyle={{marginTop: 10, marginLeft: 10}}
               overlayContainerStyle={{backgroundColor: '#1b2f50'}}
               activeOpacity={0.8}
           />

            <Text>Name: {this.state.first_Name} {this.state.last_Name}</Text>
            <Text>Email: {this.state.email}</Text>
            <Text>Status: {this.state.role}</Text>
            <Text>Phone Number: {this.state.phone_Number}</Text>
            <Text>Quote: {this.state.quote}</Text>
            <View>
                {this.state.items > 0 ? (
                  <Text>Start a chat</Text>,
                  <UserComponent items={this.state.item} navigation={this.props.navigation} />
                  ) : (
                  <Text></Text>
                )}
            </View>
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
        backgroundColor: '#39bde1',
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
