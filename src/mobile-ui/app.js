import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { Button, View, Text, StyleSheet, Platform } from 'react-native';
import { AppContainer } from 'react-hot-loader';

import { store } from './store';
import * as appActions from './store/action/app';

const utils = {
  isBrowser: process.env.BROWSER || false,
};

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,
Cmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,
Shake or press menu button for dev menu`,
  web: `Command/Control+R to reload your browser :p
And in Browser, we have great advantage
when using Chrome Developer Tool
compare to the poor native-dev-menu!`,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  counterButton: {
    backgroundColor: '#00bcd4',
    marginTop: 10,
  },
  buttonWrapper: {
    backgroundColor: '#00bcd4',
    marginTop: 20,
  },
  buttonIcon: {
    fontSize: 28,
    color: '#ffffff',
  },
});

class App extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  increaseCounter = () => {
    this.props.dispatch(appActions.increaseCounter());
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Universal Ui</Text>
        <Text style={styles.instructions}>To get started, edit src/index.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          wrapperStyle={styles.buttonWrapper}
          title={`Increase counter [${this.props.counter}]`}
          onPress={this.increaseCounter}
        />
      </View>
    );
  }
}

const ConnectedApp = connect(({ app }) => ({
  counter: app.counter,
}))(App);

function Root(props) {
  return (
    <Provider store={store} {...props}>
      <ConnectedApp />
    </Provider>
  );
}

function HotRoot(props) {
  return (
    <AppContainer>
      <Provider store={store} {...props}>
        <ConnectedApp />
      </Provider>
    </AppContainer>
  );
}

export default (utils.isBrowser ? HotRoot : Root);
