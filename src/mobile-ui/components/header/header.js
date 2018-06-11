/* eslint-disable react/prop-types */

import React from 'react';
import { storeShape } from 'react-redux/es/utils/PropTypes';
import { push } from 'connected-react-router';
import { View, Platform, StyleSheet } from 'components/core';
import Button from 'components/button';
import styled from 'styled-components';

import RouterLink from 'components/router-link';
import AvxLogoSvg from 'components/logo';

import theme from 'theme';

const paddingTop =
  {
    ios: 20,
  }[Platform.OS] || 0;

const StyledHeader = styled(View)`
  background: ${theme.header.backgroundColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
  box-shadow: ${theme.shadow.layer};
  padding-top: ${paddingTop}px;
  height: ${paddingTop + 40}px;
  min-height: ${paddingTop + 40}px;
  max-height: ${paddingTop + 40}px;
  z-index: 1000;
`;

const styleSheet = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    borderRadius: 0,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'transparent',
  },
  buttonActive: {
    backgroundColor: theme.activeBackgroundColor,
  },
  buttonText: {
    color: theme.textColor,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '17px',
  },
  buttonTextActive: {
    color: theme.activeTextColor,
  },
});

const logoSize = Platform.OS === 'web' ? 24 : 20;
const AvxLogo = styled(AvxLogoSvg)`
  align-self: center;
  min-width: ${logoSize}px;
  height: ${logoSize}px;
  flex-grow: 0;
  margin-left: 8px;
  margin-right: 24px;
`;

class Header extends React.PureComponent {
  static contextTypes = {
    store: storeShape,
  };

  goTo(path, state = {}) {
    // TODO: implement
    const {
      store: { dispatch },
    } = this.context;
    dispatch(push(path, state));
  }

  goToTrending = () => {
    this.goTo('/trending');
  };

  goToVideos = () => {
    this.goTo('/video');
  };

  goToWallet = () => {
    this.goTo('/wallet');
  };

  goToPreferences = () => {
    this.goTo('/preferences');
  };

  render() {
    return (
      <StyledHeader>
        <AvxLogo
          label={Platform.OS === 'web'}
          secondaryColor={theme.textColor}
          color="transparent"
        />
        <RouterLink
          to="/video"
          title={__('Videos')}
          style={styleSheet.button}
          activeStyle={styleSheet.buttonActive}
          textStyle={styleSheet.buttonText}
          activeTextStyle={styleSheet.buttonTextActive}
          component={Button}
          onPress={this.goToVideos}
        />
        <RouterLink
          to="/trending"
          title={__('Trending')}
          style={styleSheet.button}
          activeStyle={styleSheet.buttonActive}
          textStyle={styleSheet.buttonText}
          activeTextStyle={styleSheet.buttonTextActive}
          component={Button}
          onPress={this.goToTrending}
        />
        <View style={{ flex: 1 }} />
        <RouterLink
          to="/wallet"
          title={__('Wallet')}
          style={styleSheet.button}
          activeStyle={styleSheet.buttonActive}
          textStyle={styleSheet.buttonText}
          activeTextStyle={styleSheet.buttonTextActive}
          component={Button}
          onPress={this.goToWallet}
        />
        <RouterLink
          to="/preferences"
          title={__('Preferences')}
          style={styleSheet.button}
          activeStyle={styleSheet.buttonActive}
          textStyle={styleSheet.buttonText}
          activeTextStyle={styleSheet.buttonTextActive}
          component={Button}
          onPress={this.goToPreferences}
        />
      </StyledHeader>
    );
  }
}

export default Header;
