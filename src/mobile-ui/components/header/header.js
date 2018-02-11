/* eslint-disable react/prop-types */

import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components';
import Link from 'components/link';
// import WunderBar from 'components/wunderbar';

const osStyles = {
  ios: css`
    padding-top: 30px;
  `,
};

const StyledHeader = styled.View`
  background: ${props => props.theme.headerBg};
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  position: relative;
  box-shadow: ${props => props.theme.boxShadowLayer};
  width: 100%;
  z-index: 3;
  padding: 0px 12px;
  ${osStyles[Platform.OS] || ''};
`;

const HeaderItem = styled.View`
  justify-content: center;
  padding-left: ${props => props.theme.spacingVertical / 4}px;
  padding-right: ${props => props.theme.spacingVertical / 4}px;
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

export const Header = props => {
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
  } = props;
  return (
    <StyledHeader>
      <HeaderItem>
        <Link
          onClick={back}
          disabled={isBackDisabled}
          button="alt button--flat"
          icon="arrow-left"
          title={__('Back')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={forward}
          disabled={isForwardDisabled}
          button="alt button--flat"
          icon="arrow-right"
          title={__('Forward')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={() => navigate('/discover')}
          button="alt button--flat"
          icon="home"
          title={__('Discover Content')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={() => navigate('/subscriptions')}
          button="alt button--flat"
          icon="at"
          title={__('My Subscriptions')}
          {...linkStyles}
        />
      </HeaderItem>
      <WunderBarHeader>{/*<WunderBar />*/}</WunderBarHeader>
      <HeaderItem>
        <Link
          onClick={() => navigate('/wallet')}
          button="text"
          className="no-underline"
          icon="bank"
          label={balance}
          title={__('Wallet')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={() => navigate('/publish')}
          button="primary button--flat"
          icon="upload"
          label={__('Publish')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={() => navigate('/downloaded')}
          button="alt button--flat"
          icon="folder"
          title={__('Downloads and Publishes')}
          {...linkStyles}
        />
      </HeaderItem>
      <HeaderItem>
        <Link
          onClick={() => navigate('/settings')}
          button="alt button--flat"
          icon="gear"
          title={__('Settings')}
          {...linkStyles}
        />
      </HeaderItem>
      {(autoUpdateDownloaded || (process.platform === 'linux' && isUpgradeAvailable)) && (
        <Link
          onClick={() => downloadUpgradeRequested()}
          button="primary button--flat"
          icon="arrow-up"
          label={__('Upgrade App')}
          {...linkStyles}
        />
      )}
    </StyledHeader>
  );
};

export default Header;
