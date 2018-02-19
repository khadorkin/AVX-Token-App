import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'components/core';
import { Image } from 'react-native';
import theme from 'theme';

const ImageCard = styled(Image)`
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth};
  min-height: ${theme.cardWidth};
  min-width: ${theme.cardWidth};
`;

const OuterCard = View.extend`
  position: relative;
  background-color: #cccccc;
  flex: 0 0 ${theme.cardWidth};
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
