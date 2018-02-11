import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-platform';
import { Button, Text, StyleSheet, Platform } from 'react-native';

import * as appActions from '../../store/action/app';

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

const Container = styled.View`
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
`;

const Block = styled.View`
  padding: 24px 0px;
  flex-basis: auto;
  flex-shrink: 0;
`;

export default class TestView extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  increaseCounter = () => {
    this.props.dispatch(appActions.increaseCounter());
  };

  discover = () => {};

  render() {
    return (
      <Container>
        <Block>
          <Text style={styles.welcome}>Welcome to Universal Ui</Text>
          <Text style={styles.instructions}>To get started, edit src/index.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <Button
            wrapperStyle={styles.buttonWrapper}
            title={`Increase counter [${this.props.counter}]`}
            onPress={this.increaseCounter}
          />
        </Block>
        <Block>
          <Text style={styles.welcome}>Views</Text>
          <Link to="/test2">
            <Text style={styles.buttonWrapper}>Go To Next View</Text>
          </Link>
        </Block>
      </Container>
    );
  }
}
