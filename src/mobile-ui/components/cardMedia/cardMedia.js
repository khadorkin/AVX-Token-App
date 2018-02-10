import React from 'react';
import styled from 'styled-components';
import { View, Text, Platform } from 'components/core';

const ImageCard =
  Platform.OS !== 'web'
    ? View
    : View.extend`
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
      `;

const OuterCard = View.extend`
  position: relative;
`;

const InnerCard = styled(Text)`
  font-size: 2em;
  width: 100%;
  color: #ffffff;
  text-align: center;
  position: absolute;
  top: 36%;
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
      return (
        <ImageCard
          style={
            {
              /*backgroundImage: `url('${thumbnail}')`*/
            }
          }
        />
      );
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
