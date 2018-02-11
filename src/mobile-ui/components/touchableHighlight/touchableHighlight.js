/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight as NativeImpl, Platform } from 'react-native';

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
  };

  render() {
    const nextProps = Object.assign({}, this.props, {
      children: undefined,
      onClick: undefined,
      onPress: undefined,
    });
    delete nextProps.onPress;
    const { children, impl, onPress, onClick } = this.props;
    if (Array.isArray(children)) {
      return (
        <NativeImpl {...impl} onPress={onPress || onClick}>
          <View {...nextProps}>{children}</View>
        </NativeImpl>
      );
    }
    return (
      <NativeImpl {...impl} onPress={onPress || onClick}>
        {children}
      </NativeImpl>
    );
  }
}

export default TouchableHighlight;
