import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-platform';
import { View, Text } from 'components/core';

import * as appActions from '../../store/action/app';

const ButtonContent = styled(Text)`
  background-color: #00bcd4;
  margin-top: 20px;
`;

const Welcome = View.extend`
  font-size: 20px;
  text-align: center;
  margin: 10px;
`;

const Container = View.extend`
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
`;

const Block = View.extend`
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
          <Welcome>Test 2</Welcome>
          <Link to="/">
            <ButtonContent>Back to Home</ButtonContent>
          </Link>
        </Block>
      </Container>
    );
  }
}
