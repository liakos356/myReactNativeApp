/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) { 
    super(props);
    this.state = {
      logs : []
    }
  }

  codePushSync() {

    this.setState({
      logs: ['Started at ' + new Date().getTime()]
    });

    CodePush.sync({
      updateDialog: true,
      installMode : CodePush.InstallMode.IMMEDIATE
    }, (status) => { 
      for (var key in CodePush.SyncStatus) { 
        if (status === CodePush.SyncStatus[key]) { 
          this.setState(prevState => ({
            logs: [...prevState.logs,
              key.replace(/_/g, ' ')]
          }))
          break;
        }
     }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Please work</Text>
        <Button title="Code Push" onPress={() => { 
          this.codePushSync();
        }}/>
        <Text>{JSON.stringify(this.state.logs)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
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
