import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'components/core';
import { Image } from 'react-native';
import theme from 'theme';

const ImageCard = styled(Image)`
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth}px;
  min-height: ${theme.cardWidth}px;
  min-width: ${theme.cardWidth}px;
`;

const OuterCard = View.extend`
  position: relative;
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth}px;
`;

const InnerCard = styled(Text)`
  font-size: 2em;
  width: 100%;
  color: #ffffff;
  text-align: center;
`;

class CardMedia extends React.PureComponent {
  static AUTO_THUMB_CLASSES = [
    'purple',
    'red',
    'pink',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'yellow',
    'orange',
  ];

  static propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    thumbnail: undefined,
  };

  componentWillMount() {
    this.setState({
      autoThumbClass:
        CardMedia.AUTO_THUMB_CLASSES[
          Math.floor(Math.random() * CardMedia.AUTO_THUMB_CLASSES.length)
        ],
    });
  }

  render() {
    const { title, thumbnail } = this.props;
    const atClass = this.state.autoThumbClass;

    if (thumbnail) {
      return <ImageCard source={{ uri: thumbnail }} />;
    }

    return (
      <OuterCard className={atClass}>
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
