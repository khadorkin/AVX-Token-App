/* eslint-disable react/prop-types */

import React from 'react';
import { View, Platform } from 'components/core';
import styled from 'styled-components';
import theme from 'theme';

import AvxLogoSvg from 'components/logo';

// import Animation from './animation';

const icon = {
  // style: Animation,
};

const defaultLogoSize = Platform.OS === 'web' ? '12vw' : '78%';
const AvxLogo = styled(AvxLogoSvg)`
  align-self: center;
  flex-grow: 0;
  margin: 8px;
`;

class Header extends React.PureComponent {
  render() {
    const {
      props: { logoSize = defaultLogoSize, ...props },
    } = this;
    return (
      <View {...props}>
        <AvxLogo
          label
          secondaryColor={theme.defaultTextColor}
          style={{ minWidth: logoSize, height: logoSize, overflow: 'visible' }}
          icon={icon}
        />
      </View>
    );
  }
}

export default styled(Header)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
