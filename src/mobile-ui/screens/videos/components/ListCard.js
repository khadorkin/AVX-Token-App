import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/ListCard';
import { TMDB_IMG_URL } from '../../constants/api';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class ListCard extends PureComponent {
  onPress = () => {
    this.props.viewMovie.call(this, this.props.info);
  };

  render() {
    const { info } = this.props;
    return (
      <View>
        <Image source={info.poster} style={styles.imageBackdrop} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']}
          style={styles.linearGradient}
        />
        <View style={styles.cardContainer}>
          <Image source={info.poster} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {info.original_title}
            </Text>
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
            <Text style={styles.cardDescription} numberOfLines={3}>
              {info.overview}
            </Text>
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
  info: PropTypes.object.isRequired,
  viewMovie: PropTypes.func.isRequired,
};

export default ListCard;
