import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
// import RootNavigation from './navigation/RootNavigation';
// import AppWithNavigationState from './navigator/AppNavigator';


import BaseScreen from './screens/BaseScreen'
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

    async componentWillMount() {
    await Font.loadAsync({
      'fontello': require('./assets/fonts/frontello.ttf'),
    });
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />}
          {/* <RootNavigation /> */}
          {/* <AppWithNavigationState /> */}
          <BaseScreen />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
  //  const font = require('./icomoon2/fonts/icomoon2.ttf')
   // console.log('ff',font)
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
      //  { 'iconmoon2': require('./icomoon2/fonts/icomoon2.ttf') }, //,

        Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') }  ,
        { 'frontello': require('./assets/fonts/frontello.ttf') }  ,

       // { 'icomoon2': require('./assets/fonts/icomoon2.ttf') }  //,
        //,

        // { 'helvetica-neue': require('./assets/fonts/HelveticaNeue.ttf') }        
      ]),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
