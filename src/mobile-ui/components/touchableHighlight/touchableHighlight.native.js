/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight as NativeImpl, Platform } from 'components/core';

const platformStyles =
  Platform.OS !== 'web'
    ? {}
    : {
        transitionProperty: 'background',
        transitionDuration: '160ms',
        transitionTimingFunction: 'ease',
      };

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
    impl: {
      underlayColor: 'rgba(0,0,0,0.12)',
      style: {
        borderRadius: 3,
        ...platformStyles,
      },
    },
    onPress: undefined,
    onClick: undefined,
    view: View,
    underlayColor: 'rgba(0,0,0,0.12)',
  };

  render() {
    // return <NativeImpl {...this.props}>{this.props.children}</NativeImpl>;
    const nextProps = Object.assign({}, this.props, {
      children: undefined,
      onClick: undefined,
      onPress: undefined,
      view: undefined,
    });
    const InnerView = this.props.view;
    delete nextProps.onPress;
    const { children, onPress, onClick } = this.props;
    return (
      <NativeImpl {...nextProps} onPress={onPress || onClick}>
        <InnerView>{children}</InnerView>
      </NativeImpl>
    );
  }
}

export default TouchableHighlight;
