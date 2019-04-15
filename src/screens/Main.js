import React from 'react'
import { StyleSheet, Platform, Image, Text, View, SafeAreaView } from 'react-native'
import firebase from 'firebase';
let config = {
  apiKey: "AIzaSyB9kMpxhilLczlWR57TLOM8IMxKuUEcRW0",
    authDomain: "react-firebase-cd68d.firebaseapp.com",
    databaseURL: "https://react-firebase-cd68d.firebaseio.com",
    projectId: "react-firebase-cd68d",
    storageBucket: "react-firebase-cd68d.appspot.com",
    messagingSenderId: "57969678002"
};
export default class Main extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
render() {
    const { currentUser } = this.state
return (
  <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
      </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeArea: {
  flex: 1,
  backgroundColor: '#ddd'
}
})
