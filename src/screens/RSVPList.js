import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
      <View>
        <Text> {this.props.navigation.state.params.eventName}</Text>
        <Text> Number of people RSVP =  {this.state.items.length} </Text>
        {this.state.items.length > 0 ? (
          <RSVPComponent items={this.state.items} navigation={this.props.navigation} />
          ) : (
          <Text>No one RSVP</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});
