/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import { ColorPropType, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { bool, func, string, number, array, oneOfType } from 'prop-types';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    padding: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf',
  },
  textDisabled: {
    color: '#a1a1a1',
  },
});

class Button extends Component<*> {
  static propTypes = {
    accessibilityLabel: string,
    color: ColorPropType,
    disabled: bool,
    onPress: func.isRequired,
    testID: string,
    title: string.isRequired,
    style: oneOfType([number, array]),
    textStyle: oneOfType([number, array]),
  };

  render() {
    const {
      accessibilityLabel,
      color,
      disabled,
      onPress,
      testID,
      title,
      style,
      textStyle,
    } = this.props;

    const styleParams = Array.isArray(style) ? style : [style && style];
    const textStyleParams = Array.isArray(textStyle) ? textStyle : [textStyle && textStyle];

    return (
      <TouchableOpacity
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.button,
          ...styleParams,
          color && { backgroundColor: color },
          disabled && styles.buttonDisabled,
        ]}
        testID={testID}
      >
        <Text style={[styles.text, ...textStyleParams, disabled && styles.textDisabled]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
