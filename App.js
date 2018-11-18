/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Analytics from "appcenter-analytics";
import Crashes from "appcenter-crashes";

import CodePush from 'react-native-code-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  func1() {
    throw Error('My uncaugth javascript exception')
  }
  codepushSync() {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.ON_NEXT_RESUME
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button 
          title='track event'
          onPress={() => { return Analytics.trackEvent('Clicked on Button', { 
            time: new Date().getTime(), 
            app: 'Second-Test' });}}
        />
        <Button 
          title='Native crash'
          onPress={() => {return Crashes.generateTestCrash}}
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
