import React, { Component } from 'react';
import { Alert, StyleSheet, View, Button, ScrollView, Text, TextInput} from 'react-native';


export default class LoginPage extends Component {
  static navigationOptions = {
    title: 'Login Page',
    headerStyle: {
      backgroundColor: '#FF8C00',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
        username: '',
        password: '',
        isLoggedIn: false,
        message: ''
      }

  _login = () => {
    this.setState({message: ''});

    var info = {
      username: this.state.username,
      password: this.state.password
    };

  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{padding: 10}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 27}}>
          Login
        </Text>
        <TextInput
          placeholder='Username'
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button title='Login' onPress={() =>navigate('ClassesPage')}/>
      </View>
      <View style={{padding: 10}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 14, textAlign: 'center', fontWeight: 'bold'}}>
          Haven't made an account yet? Make one below
        </Text>
        </View>
        <Button title='new account' onPress={() =>navigate('RegistrationPage')}/>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
