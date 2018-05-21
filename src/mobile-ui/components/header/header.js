/* eslint-disable react/prop-types */

import React from 'react';
import { View, Platform } from 'components/core';
import styled from 'styled-components';
import Link from 'components/link';
import theme from 'theme';
// import WunderBar from 'components/wunderbar';

import AvxLogoSvg from 'components/logo';

const paddingTop =
  {
    ios: 20,
  }[Platform.OS] || 0;

const StyledHeader = (View.extend || View.extend)`
  background: ${theme.headerBg};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
  box-shadow: ${theme.boxShadowLayer};
  padding-top: ${paddingTop}px;
  height: ${paddingTop + 40}px;
  min-height: ${paddingTop + 40}px;
  max-height: ${paddingTop + 40}px;
`;

const HeaderItem = Link.extend`
  justify-content: center;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: ${theme.iconSize}px;
  min-height: ${theme.iconSize}px;
  max-width: ${theme.iconSize}px;
  max-height: ${theme.iconSize}px;
`;

const WunderBarHeader = styled(HeaderItem)`
  flex-grow: 1;
  max-width: 20%;
`;

const logoSize = Platform.OS === 'web' ? 24 : 20;
const logoMarginLeft = Platform.OS === 'web' ? 3 : 12;
const logoMarginBottom = Platform.OS === 'web' ? 0 : -1;
const AvxLogo = styled(AvxLogoSvg)`
  align-self: center;
  min-width: ${logoSize}px;
  height: ${logoSize}px;
  flex-grow: 0;
  margin-left: ${logoMarginLeft}px;
  margin-bottom: ${logoMarginBottom}px;
`;

class Header extends React.PureComponent {
  render() {
    const {
      balance,
      back,
      forward,
      isBackDisabled,
      isForwardDisabled,
      isUpgradeAvailable,
      autoUpdateDownloaded,
      downloadUpgradeRequested,
    } = this.props;
    return (
      <StyledHeader>
        <AvxLogo label={Platform.OS === 'web'} secondaryColor={theme.defaultTextColor} />
        <HeaderItem onClick={back} disabled={isBackDisabled} icon="arrow-left" title={__('Back')} />
        <HeaderItem
          onClick={forward}
          disabled={isForwardDisabled}
          icon="arrow-right"
          title={__('Forward')}
        />
        <HeaderItem to="/discover" icon="home" title={__('Discover Content')} />
        <HeaderItem to="/subscriptions" icon="at" title={__('My Subscriptions')} />
        <WunderBarHeader>{/*<WunderBar />*/}</WunderBarHeader>
        <HeaderItem
          to="/wallet"
          button="text"
          className="no-underline"
          icon="bank"
          label={balance}
          title={__('Wallet')}
        />
        {/*<HeaderItem
          onClick={() => navigate('/publish')}
          button="primary button--flat"
          icon="upload"
          label={__('Publish')}
        />*/}
        <HeaderItem onClick="/downloaded" icon="folder" title={__('Downloads and Publishes')} />
        <HeaderItem onClick="/settings" icon="gear" title={__('Settings')} />
        {(autoUpdateDownloaded || (process.platform === 'linux' && isUpgradeAvailable)) && (
          <HeaderItem
            onClick={() => downloadUpgradeRequested()}
            button="primary button--flat"
            icon="arrow-up"
            label={__('Upgrade App')}
          />
        )}
      </StyledHeader>
    );
  }
}

export default Header;
