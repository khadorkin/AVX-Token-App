import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-native';
import theme from 'theme';

const ImageCard = styled(Image)`
  flex: 0 0 ${theme.card.width};
  min-height: ${theme.card.width};
  min-width: ${theme.card.width};
`;

class CardMedia extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    const { src, ...props } = this.props;
    return <ImageCard {...props} source={{ uri: src }} />;
  }
}

export default CardMedia;
