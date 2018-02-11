import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-platform';
import { Text, StyleSheet } from 'react-native';

import * as appActions from '../../store/action/app';

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
          <Text style={styles.welcome}>Test 2</Text>
          <Link to="/">
            <Text style={styles.buttonWrapper}>Back to Home</Text>
          </Link>
        </Block>
      </Container>
    );
  }
}
