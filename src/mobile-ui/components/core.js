/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import styled from 'styled-components';
import { Button as RnButton } from 'react-native-web';

export {
  AppRegistry,
  // Button,
  Platform,
  NativeModules,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableHighlight,
} from 'react-native-web';

class RawView extends React.PureComponent {
  render() {
    return <div {...this.props}>{this.props.children}</div>;
  }
}
export const View = styled(RawView)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-stretch;
`;

export class Text extends React.PureComponent {
  render() {
    return <p {...this.props}>{this.props.children}</p>;
  }
}

class RawButton extends React.PureComponent {
  render() {
    const { props } = this;
    return <RnButton {...props}>{props.title || props.children}</RnButton>;
  }
}

export const Button = styled(RawButton)`
  background-color: #2196F3;
  border-radius: 2;
  color: #fff;
  font-weight: 500',
  padding: 8;
  text-align: center;
  text-transform: uppercase;
  flex-grow: 0;
  &.disabled {
    background-color: '#dfdfdf'
    color: '#a1a1a1'
  }
}
`;

export class TextInput extends React.PureComponent {
  render() {
    return <input {...this.props} />;
  }
}
