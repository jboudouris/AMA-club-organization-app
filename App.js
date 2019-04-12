import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import Home from './src/screens/Home';

// we will use these two screens later in our AppNavigator
import AddItem from './src/screens/AddItem';
import List from './src/screens/List';
import AddUser from './src/screens/AddUser';
import Login from './src/screens/Login';
import Check from './src/screens/Check';
import SignUp from './src/screens/SignUp';
import Loading from './src/screens/Loading';
import SignUpp from './src/screens/SignUpp';
import Loginn from './src/screens/Loginn';
import Main from './src/screens/Main';
import CreateEvent from './src/screens/CreateEvent';
import EventDetail from './src/screens/EventDetail';
import ListEvent from './src/screens/ListEvent';
import RSVP from './src/screens/RSVP';
import DeleteEvent from './src/screens/DeleteEvent';
import Calender from './src/screens/Calender';
import Archives from './src/screens/Archives';
import AddPost from './src/screens/AddPost';
import ViewAllPost from './src/screens/ViewAllPost';
import ViewAllUser from './src/screens/ViewAllUser';
import Chat from './src/screens/Chat';
import EditEvent from './src/screens/EditEvent';
import ForgetPassword from './src/screens/ForgetPassword';
import RSVPList from './src/screens/RSVPList';
import Profile from './src/screens/Profile';
import ProfileEdit from './src/screens/ProfileEdit';
import Tools from './src/screens/Tools';

const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUpp,
    SignUp,
    Loginn,
    Main,
    CreateEvent,
    Home,
    ListEvent,
    RSVP,
    DeleteEvent,
    Calender,
    EventDetail,
    Archives,
    AddPost,
    ViewAllPost,
    ViewAllUser,
    Chat,
    EditEvent,
    ForgetPassword,
    RSVPList,
    Profile,
    ProfileEdit,
    Tools,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}