import React, {Component} from 'react';
import UserComponent from '../components/UserComponent';
import { ImageBackground, Image, View, Modal, Text, TouchableOpacity, Button, SafeAreaView, StyleSheet} from 'react-native';
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
            <View style={styles.buttonView}>
               <Avatar
                   rounded size="xlarge"
                   title={this.state.first_Name[0] + this.state.last_Name[0]}
                   containerStyle={{marginTop: 10, marginLeft: 10}}
                   overlayContainerStyle={{backgroundColor: 'rgba(45,78,134,.8)', borderColor: 'white', borderWidth: .5}}
                   activeOpacity={0.8}
               />
                <Text style={styles.quote}>{this.state.quote}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.txt}>{this.state.first_Name} {this.state.last_Name}</Text>
                <Text style={styles.txt}>Email: {this.state.email}</Text>
                <Text style={styles.txt}>Status: {this.state.role}</Text>
                <Text style={styles.txt}>Phone Number: {this.state.phone_Number}</Text>
                <View>
                    {this.state.items > 0 ? (
                      <Text>Start a chat</Text>,
                      <UserComponent items={this.state.item} navigation={this.props.navigation} />
                      ) : (
                      <Text></Text>
                    )}
                </View>
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
    body: {
        backgroundColor: 'rgba(255,255,255,.8)',
        height: '75%',
        margin: 5,
    },
    btn: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255,255,255,0)',
        margin: 15,
    },
    buttonView: {
        height: '27.5%',
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
    txt: {
        fontSize: 24,
        marginLeft: 5,
        marginTop: 5
    },
    quote: {
        alignItems: 'center',
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        margin: 10,
    }
});
