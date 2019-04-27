import React, { Component } from 'react';
import { TouchableOpacity, Image,  ImageBackground, View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import RSVPComponent from '../components/RSVPComponent';

import { db } from '../config';



export default class List extends Component {
  state = {
    items: [],

  };

  componentDidMount() {
    let RSVPchild = this.props.navigation.state.params.eventName;
    let itemsRef = db.ref('/userRSVP');
    itemsRef.child(RSVPchild).on('value', snapshot => {
      if (snapshot.exists() == true ){
      let data = snapshot.val();
      let items = Object.values(data);

      this.setState({ items: items });

      }
      else {

      }

    //   if (items.length > 0){
    //   this.setState({
    //     items: items
    //   });
    // }

      //get Key of the thing
      //alert(Object.keys(snapshot.val())[1]);
      //}
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.main}>
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
         <ScrollView style={{height:'100%'}}>
            {this.state.items.length > 0 ? (
              <RSVPComponent items={this.state.items} navigation={this.props.navigation} />
              ) : (
              <Text>No one has RSVP'd yet</Text>
            )}
         </ScrollView>
        </ImageBackground>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    btntxt: {
        fontSize: 18,
        color: 'white',
    },
    btn1: {
        backgroundColor: 'rgba(45,78,134,0.7)',
        alignSelf: 'center',

        width: '100%',
        borderWidth: 1,

        borderColor: 'white',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#ddd'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
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
    txt1: {
        fontSize: 30,
        marginBottom: 15,
        alignSelf: 'center',
        color: 'black',
    },
    txt2: {
        fontSize: 20,
        marginTop: 5,

        alignSelf: 'center',
        color: 'black',
    },
});
