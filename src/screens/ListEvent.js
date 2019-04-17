import React, { Component } from 'react';
import { TouchableOpacity, Image, ImageBackground, View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import EventComponent from '../components/EventComponent';

import { db } from '../config';

let itemsRef = db.ref('/event');

export default class List extends Component {
  state = {
    items: [],

  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      //this.setState({ items });
      if (items.length > 0){
      this.setState({
        items: items
      });
    }

      //get Key of the thing
      //alert(Object.keys(snapshot.val())[1]);
      //}
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
         <View style={styles.columnView}>
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
                  <ScrollView>
                      <View style={styles.container}>
                            {this.state.items.length > 0 ? (
                              <EventComponent items={this.state.items} navigation={this.props.navigation}/>
                            ) : (
                              <Text>No items</Text>
                            )}
                      </View>
                  </ScrollView>
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
    columnView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
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
});
