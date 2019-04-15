import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import EventComponent from '../components/EventComponent';

import { db } from '../config';

let itemsRef = db.ref('/event');

export default class List extends Component {
  state = {
    items: [],
    eventToday: '',

  };

  // componentDidMount() {
  //   this.setState({
  //     eventToday: this.props.eventToday
  //   });
  //   itemsRef.on('value', snapshot => {
  //     let data = snapshot.val();
  //     let items = Object.values(data);
  //     //this.setState({ items });
  //     if (items.length > 0){
  //       for (i=0; i<items.length; i++){
  //         if (items[i].date == this.props.eventToday){
  //           this.setState({
  //             items: items
  //           });
  //         }
  //       }
  //   }
  //     //get Key of the thing
  //     //alert(Object.keys(snapshot.val())[1]);
  //     //}
  //   });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if(this.state.eventToday != this.props.eventToday) // Check if it's a new user, you can also use some unique property, like the ID
  //   {
  //          this.state.items=[]
  //          this.anotherFunc();
  //
  //   }
  // }

  componentDidUpdate(prevProps) {
      if(this.state.eventToday != this.props.eventToday) // Check if it's a new user, you can also use some unique property, like the ID
      {
             this.state.items=[]
             this.anotherFunc();

      }
}

  anotherFunc = () => {
    this.setState({
      eventToday: this.props.eventToday,
    });

    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      //this.setState({ items });
      if (items.length > 0){
        for (i=0; i<items.length; i++){
          if (items[i].date == this.props.eventToday){
            this.state.items.push(items[i])
          }
        }
    }
    });
  }



  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <ScrollView>
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <EventComponent items={this.state.items} navigation={this.props.navigation}/>
        ) : (
          <Text>No items</Text>
        )}
      </View>
      </ScrollView>
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
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
});
