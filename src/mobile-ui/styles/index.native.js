/* eslint-disable import/no-commonjs */
/** Global Style Shim
 * React-Native does not support cascading styles,
 * apply the global theme to the standard components here instead
 */

const ReactNative = require('react-native');
const styled = require('styled-components/native').default;

const Text = styled(ReactNative.Text)`
  color: ${props => props.theme.defaultTextColor};
`;

Object.defineProperties(ReactNative, {
  Text: {
    configurable: true,
    enumerable: true,
    value: Text,
  }
})

module.exports = {};
