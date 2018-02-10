import React from 'react';
import { Platform } from 'react-native';

const Theme = props => {
  const { themePath } = props;

  if (!themePath) {
    return null;
  }

  if (Platform.OS === 'web') {
    return <link href={themePath} rel="stylesheet" type="text/css" media="screen,print" />;
  }
  return null;
};

export default Theme;
