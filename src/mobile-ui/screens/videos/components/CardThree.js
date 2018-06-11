/* eslint-disable new-cap */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TruncatedText, TouchableOpacity, View } from 'components/core';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles/CardThree';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class CardThree extends PureComponent {
  onPress = () => {
    this.props.viewMovie.call(this, this.props.info);
  };

  render() {
    const { info } = this.props;
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={this.onPress}>
          <View style={styles.card}>
            <Image source={info.poster} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <TruncatedText style={styles.cardTitle} numberOfLines={3}>
                {info.original_title}
              </TruncatedText>
              <View style={styles.cardGenre}>
                <Text style={styles.cardGenreItem}>{info.release_date.substring(0, 4)}</Text>
              </View>
              <View style={styles.cardNumbers}>
                <View style={styles.cardStar}>
                  {iconStar}
                  <Text style={styles.cardStarRatings}>{info.vote_average.toFixed(1)}</Text>
                </View>
                <Text style={styles.cardRunningHours} />
              </View>
              <TruncatedText style={styles.cardDescription} numberOfLines={3}>
                {info.overview}
              </TruncatedText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

CardThree.propTypes = {
  info: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewMovie: PropTypes.func.isRequired,
};

export default CardThree;
