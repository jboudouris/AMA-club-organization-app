import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View>
       <Text>Home Screen</Text>
       <Button
         title="Add an Item"
         onPress={() => this.props.navigation.navigate('AddItem')}
       />
     </View>
     </SafeAreaView>
   );
  }
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: '#ddd'
  }
});
