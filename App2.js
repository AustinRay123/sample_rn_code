import {AppState, Text, View} from 'react-native';
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';

export class App2 extends Component {
  componentDidMount() {
    SplashScreen.hide();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      console.log('manthan ');
      // App is transitioning to the background state (paused)
      // Place your code here to handle the "paused" state on Android
    }
  };
  render() {
    return (
      <View>
        <Text>App2</Text>
      </View>
    );
  }
}

export default App2;
