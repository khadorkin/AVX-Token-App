/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'components/core';

const Impl = View.extend`
  border-radius: 3px;
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
  };

  static defaultProps = {
    onPress: undefined,
    onClick: undefined,
    view: View,
  };

  render() {
    // return <NativeImpl {...this.props}>{this.props.children}</NativeImpl>;
    const { children, onClick, onPress, view, ...nextProps } = this.props;
    const InnerView = view;
    return (
      <Impl {...nextProps} onClick={onPress || onClick}>
        <InnerView>{children}</InnerView>
      </Impl>
    );
  }
}

export default TouchableHighlight;
