import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {Text} from 'react-native'
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import HomeScreen from '../screens/dictionary';

const DrawerStack = DrawerNavigator({
  HomeScreen: { screen: HomeScreen },

  HomeScreen1: { screen: HomeScreen },
  HomeScreen2: { screen: HomeScreen },
  HomeScreen3: { screen: HomeScreen },
})

const RootStackNavigator = StackNavigator(
  {
    DrawerStack: {
      screen: DrawerStack,
    },
  },
  {
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  }),
  // initialRouteName: 'HomeScreen',
  // title: 'Main'  
}
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
