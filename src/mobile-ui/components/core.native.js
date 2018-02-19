/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Text as NativeText, View as NativeView } from 'react-native';
import styled from 'styled-components';
import theme from 'theme';

export {
  AppRegistry,
  Button,
  TextInput,
  Platform,
  NativeModules,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

export const Text = styled.Text`
  color: ${theme.defaultTextColor};
`;

class RawView extends React.PureComponent {
  render() {
    if (typeof this.props.children === 'string') {
      return <NativeText {...this.props} />;
    }
    return <NativeView {...this.props} />;
  }
}
export const View = styled(RawView)`
  margin: 0;
  padding: 0;
`;
