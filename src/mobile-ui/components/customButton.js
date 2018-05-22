/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { TouchableOpacity, StyleSheet, ColorPropType } from 'react-native';
import PropTypes, { bool, func, string, element } from 'prop-types';
import React, { Component } from 'react';
import Link from './link';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 2,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
  buttonDisabled: {
    alignSelf: 'center',
    backgroundColor: '#dfdfdf',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

class Button extends Component {
  static propTypes = {
    accessibilityLabel: string,
    color: ColorPropType,
    disabled: bool,
    onPress: func,
    testID: string,
    children: element.isRequired,
    style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    accessibilityLabel: '',
    color: undefined,
    disabled: false,
    testID: undefined,
    onPress: () => {},
    style: undefined,
  };

  static Link = Link.extend`
    color: white;
  `;

  render() {
    const {
      accessibilityLabel,
      color,
      disabled,
      onPress,
      testID,
      style = {},
      children,
    } = this.props;

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={[
          style,
          styles.button,
          color && { backgroundColor: color },
          disabled && styles.buttonDisabled,
        ]}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

export default Button;
