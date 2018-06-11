import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Text, TruncatedText, TouchableOpacity, View } from 'components/core';
import theme from 'theme';

import styles from './styles/ListCard';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

const gradient = [
  `rgba(${theme.backgroundColorRgb}, 0.6)`,
  `rgba(${theme.backgroundColorRgb}, 0.8)`,
  `rgba(${theme.backgroundColorRgb}, 0.9)`,
];

class ListCard extends PureComponent {
  onPress = () => {
    this.props.viewMovie.call(this, this.props.info);
  };

  render() {
    const { info, ...props } = this.props;
    return (
      <View {...props}>
        <Image source={info.poster} style={styles.imageBackdrop} />
        <LinearGradient colors={gradient} style={styles.linearGradient} />
        <View style={styles.cardContainer}>
          <Image source={info.poster} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <TruncatedText style={styles.cardTitle} numberOfLines={2}>
              {info.original_title}
            </TruncatedText>
            <View style={styles.cardGenre}>
              <Text style={styles.cardGenreItem}>Action</Text>
            </View>
            <View style={styles.cardNumbers}>
              <View style={styles.cardStar}>
                {iconStar}
                <Text style={styles.cardStarRatings}>8.9</Text>
              </View>
              <Text style={styles.cardRunningHours} />
            </View>
            <TruncatedText style={styles.cardDescription} numberOfLines={3}>
              {info.overview}
            </TruncatedText>
            <TouchableOpacity activeOpacity={0.9} onPress={this.onPress}>
              <View style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View Details</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
ListCard.propTypes = {
  info: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewMovie: PropTypes.func.isRequired,
};

export default styled(ListCard)`
  width: 360px;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 4px;
  margin-bottom: 8px;
  box-shadow: ${theme.shadow.layer};
  user-select: none;
  &:hover {
    box-shadow: ${theme.shadow.focus};
  }
`;
