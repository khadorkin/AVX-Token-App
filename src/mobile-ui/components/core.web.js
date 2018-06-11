/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Text } from 'react-native-web';

export * from 'react-native-web';

export const TruncatedText = ({ numberOfLines, style, ...props }) => (
  <Text
    style={[style, { maxHeight: `${numberOfLines * 1.3}em`, lineHeight: '1.3em' }]}
    {...props}
  />
);
