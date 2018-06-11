/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'components/core';
import styled from 'styled-components';

// border-radius: 3px;
const Impl = styled(View)`
  border-radius: 1px;
  transition-property: background;
  transition-duration: 160ms;
  transition-timingfunction: ease;
  &:active {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;

class TouchableHighlight extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    impl: PropTypes.object,
    onPress: PropTypes.func,
    onClick: PropTypes.func,
    view: PropTypes.any,
    underlayColor: PropTypes.string,
    span: PropTypes.func,
  };

  static defaultProps = {
    onPress: undefined,
    onClick: undefined,
    view: View,
    span: undefined,
  };

  render() {
    // return <NativeImpl {...this.props}>{this.props.children}</NativeImpl>;
    const { children, onClick, onPress, view, span, ...nextProps } = this.props;
    return (
      <Impl {...nextProps} onClick={onPress || onClick}>
        {children}
      </Impl>
    );
  }
}

export default TouchableHighlight;
