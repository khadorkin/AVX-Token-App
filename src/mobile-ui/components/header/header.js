/* eslint-disable react/prop-types */

import React from 'react';
import { View, Platform } from 'components/core';
import styled, { css } from 'styled-components';
import Link from 'components/link';
import theme from 'theme';
// import WunderBar from 'components/wunderbar';

const paddingTop =
  {
    ios: 20,
  }[Platform.OS] || 0;

const StyledHeader = (View.extend || View.extend)`
  background: ${theme.headerBg};
  display: flex;
  flex-direction: row;
  align-items: stretch;
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
  padding-left: ${theme.spacingVertical / 4}px;
  padding-right: ${theme.spacingVertical / 4}px;
`;

const WunderBarHeader = styled(HeaderItem)`
  flex-grow: 1;
`;

// const StyledLink = styled(Link)`
//   flex-grow: 1;
// `

const linkStyles = {
  padding: '12px 0px',
};

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
      navigate,
      downloadUpgradeRequested,
    } = this.props;
    return (
      <StyledHeader>
        <HeaderItem
          onClick={back}
          disabled={isBackDisabled}
          button="alt button--flat"
          icon="arrow-left"
          title={__('Back')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={forward}
          disabled={isForwardDisabled}
          button="alt button--flat"
          icon="arrow-right"
          title={__('Forward')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={() => navigate('/discover')}
          button="alt button--flat"
          icon="home"
          title={__('Discover Content')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={() => navigate('/subscriptions')}
          button="alt button--flat"
          icon="at"
          title={__('My Subscriptions')}
          {...linkStyles}
        />
        <WunderBarHeader>{/*<WunderBar />*/}</WunderBarHeader>
        <HeaderItem
          onClick={() => navigate('/wallet')}
          button="text"
          className="no-underline"
          icon="bank"
          label={balance}
          title={__('Wallet')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={() => navigate('/publish')}
          button="primary button--flat"
          icon="upload"
          label={__('Publish')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={() => navigate('/downloaded')}
          button="alt button--flat"
          icon="folder"
          title={__('Downloads and Publishes')}
          {...linkStyles}
        />
        <HeaderItem
          onClick={() => navigate('/settings')}
          button="alt button--flat"
          icon="gear"
          title={__('Settings')}
          {...linkStyles}
        />
        {(autoUpdateDownloaded || (process.platform === 'linux' && isUpgradeAvailable)) && (
          <HeaderItem
            onClick={() => downloadUpgradeRequested()}
            button="primary button--flat"
            icon="arrow-up"
            label={__('Upgrade App')}
            {...linkStyles}
          />
        )}
      </StyledHeader>
    );
  }
}

export default Header;
