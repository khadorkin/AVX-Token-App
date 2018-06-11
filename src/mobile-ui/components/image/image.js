import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'components/core';
import theme from 'theme';

const ImageCard = styled(View)`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  flex: 0 0 ${theme.card.width};
`;

class ImageComponent extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    style: PropTypes.style,
  };

  static defaultProps = {
    style: undefined,
  };

  render() {
    const { src, style, ...props } = this.props;
    const srcStyle = {
      backgroundImage: `url('${src}')`,
    };
    return <ImageCard {...props} style={style ? Object.assign(srcStyle, style) : srcStyle} />;
  }
}

export default ImageComponent;
