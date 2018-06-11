import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, TruncatedText, TouchableOpacity, View } from 'components/core';

import styles from './styles/CardTwo';

class CardTwo extends PureComponent {
  onPress = () => {
    this.props.viewMovie.call(this, this.props.info);
  };
  render() {
    const { info } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
        <View style={styles.cardContainer}>
          <Image source={info.poster} style={styles.cardImage} />
          <View style={styles.cardTitleContainer}>
            <TruncatedText style={styles.cardTitle} numberOfLines={2}>
              {info.original_title}
            </TruncatedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

CardTwo.propTypes = {
  info: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  viewMovie: PropTypes.func.isRequired,
};

export default CardTwo;
