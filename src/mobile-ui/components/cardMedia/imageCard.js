import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'components/core';

class Image extends React.PureComponent {
  static propTypes = {
    source: PropTypes.object, // eslint-disable-line
    style: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    source: {},
    style: {},
  };

  render() {
    const {
      source: { uri = '' },
      style,
      ...props
    } = this.props;
    return <View style={Object.assign({ backgroundImage: `url('${uri}')` }, style)} {...props} />;
  }
}

export default styled(Image)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;
