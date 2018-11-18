/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import Analytics from "appcenter-analytics";
import Crashes from "appcenter-crashes";
//import AppCenter from 'appcenter';

import CodePush from 'react-native-code-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {

  constructor(props) {
    super(props);

    //AppCenter.start(getApplication(), "05a72986-601d-4ce2-880a-ecea77711b6a", Analytics.class, Crashes.class);
  }

  func1() {
    throw Error('My uncaugth javascript exception')
  }
  codepushSync() {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.ON_NEXT_RESUME
    })
  }

  trackEvent() {
    Analytics.trackEvent('Clicked on Button', { 
      time: new Date().getTime()
    });
    alert('event was clicked');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>I added this text using codepush</Text>
        <Text style={styles.instructions}>and this was for the second release</Text>
        <Button 
          title='track event'
          onPress={() => { 
            this.trackEvent();
          }}
        />
        <Button 
          title='Native crash'
          onPress={() => {return Crashes.generateTestCrash()}}
        />
        <Button 
          title='Js crash'
          onPress={() => {
            return this.func1();
          }}
        />
        <Button 
          title='codpush sync'
          onPress={() => {
            this.codepushSync();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default CodePush(App);
