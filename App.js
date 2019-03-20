import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';

const AppNavigator = createStackNavigator({
  LoginPage: { screen: LoginPage },
},
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
