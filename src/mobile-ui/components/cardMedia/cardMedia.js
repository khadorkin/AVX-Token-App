import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'components/core';
import theme from 'theme';
import imageCard from './imageCard';

const ImageCard = imageCard.extend`
  min-height: ${theme.cardWidth - 4 * theme.fontSize}px
  min-width: ${theme.cardWidth}px;
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth - 4 * theme.fontSize}px;
`;

const OuterCard = View.extend`
  position: relative;
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth - 4 * theme.fontSize}px;
`;

const InnerCard = styled(Text)`
  font-size: ${theme.fontSize * 2}px;
  width: 100%;
  color: #ffffff;
  text-align: center;
`;

class CardMedia extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    title: '',
    thumbnail: undefined,
    style: {},
  };

  render() {
    const { title, thumbnail, style } = this.props;

    if (thumbnail) {
      return <ImageCard style={style} source={{ uri: thumbnail }} />;
    }

    return (
      <OuterCard style={style}>
        <InnerCard>
          {title &&
            title
              .replace(/\s+/g, '')
              .substring(0, Math.min(title.replace(' ', '').length, 5))
              .toUpperCase()}
        </InnerCard>
      </OuterCard>
    );
  }
}

export default CardMedia;
