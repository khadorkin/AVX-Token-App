/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { StyleSheet, Text as NativeText } from 'react-native';
import theme from 'theme';

export * from 'react-native';

const styles = StyleSheet.create({
  textDefault: {
    color: theme.defaultColor,
  },
});

export const Text = ({ style = styles.textDefault, ...props }) => (
  <NativeText style={style} {...props} />
);
export const TruncatedText = Text;

// class RawView extends React.PureComponent {
//   render() {
//     if (typeof this.props.children === 'string') {
//       return <NativeText {...this.props} />;
//     }
//     return <NativeView {...this.props} />;
//   }
// }
// export const View = styled(RawView)`
//   margin: 0;
//   padding: 0;
// `;

// export const Image = NativeImage;
