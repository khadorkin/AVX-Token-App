import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-platform';
import { Button, View, Text, Platform } from 'components/core';

import * as appActions from '../../store/action/app';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,
Cmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,
Shake or press menu button for dev menu`,
  web: `Command/Control+R to reload your browser`,
});

const Instructions = styled(Text)`
  text-align: center;
  color: #333333;
  margin-bottom: 5px;
`;

const ButtonContent = styled(View)`
  background-color: #00bcd4;
  margin-top: 20px;
`;
const CustomButton = styled(Button)`
  background-color: #00bcd4;
  margin-top: 20px;
`;

const Welcome = styled(View)`
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;

const Container = styled(View)`
  flex-grow: 1;
  flex-direction: column;
`;

const Block = styled(View)`
  padding: 24px 0px;
  flex-basis: auto;
  flex-shrink: 0;
  align-items: center;
`;

export default class Wallet extends Component {
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
          <Welcome>Welcome to Universal Ui</Welcome>
          <Instructions>To get started, edit src/index.js</Instructions>
          <Instructions>{instructions}</Instructions>
          <CustomButton
            title={`Increase counter [${this.props.counter}]`}
            onPress={this.increaseCounter}
          />
        </Block>
        <Block>
          <Welcome>Wallet</Welcome>
          <Link to="/discover" type="button">
            <ButtonContent>Go To Next View</ButtonContent>
          </Link>
        </Block>
      </Container>
    );
  }
}
