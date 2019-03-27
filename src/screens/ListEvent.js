import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView>
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <EventComponent items={this.state.items} navigation={this.props.navigation}/>
        ) : (
          <Text>No items</Text>
        )}
      </View>
      </ScrollView>
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
