/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import MemoryRouter from 'react-router/MemoryRouter';
import { Alert } from 'react-native';

/**
 * The public API for a <Router> designed for React Native. Gets
 * user confirmations via Alert by default.
 */
const NativeRouter = props => <MemoryRouter {...props} />;

NativeRouter.propTypes = {
  initialEntries: PropTypes.array, // eslint-disable-line
  initialIndex: PropTypes.number,
  getUserConfirmation: PropTypes.func,
  keyLength: PropTypes.number,
  children: PropTypes.node,
};

NativeRouter.defaultProps = {
  getUserConfirmation: (message, callback) => {
    Alert.alert('Confirm', message, [
      { text: 'Cancel', onPress: () => callback(false) },
      { text: 'OK', onPress: () => callback(true) },
    ]);
  },
};

export default NativeRouter;
