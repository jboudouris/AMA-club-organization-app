import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
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
import EditEvent from './src/screens/EditEvent'
const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUpp,
    SignUp,
    Loginn,
    Main,
    AddItem,
    CreateEvent,
    Home,
    ListEvent,
    RSVP,
    DeleteEvent,
    List,
    Calender,
    EventDetail,
    Archives,
    AddPost,
    ViewAllPost,
    ViewAllUser,
    Chat,
    EditEvent,
  },
  {
    initialRouteName: 'Loading'
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
