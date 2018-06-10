/* eslint-disable new-cap */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../../_global/theme';

const styles = StyleSheet.create({
  card: {
    height: 32,
    flexDirection: 'row',
    // paddingRight: 16,
    paddingTop: 8,
    overflow: 'hidden',
  },
  cardTitle: {
    color: theme.textColor,
    fontSize: 16,
    flex: 1,
    // fontWeight: '400',
  },
  cardValue: {
    color: theme.textColor,
    fontSize: 16,
    fontWeight: '600',
  },
});

class CardTransaction extends PureComponent {
  render() {
    const { title, value } = this.props;
    return (
      <View style={styles.card}>
        <Text key="title" style={styles.cardTitle}>
          {title}
        </Text>
        <Text key="value" style={styles.cardValue}>
          {value}
        </Text>
      </View>
    );
  }
}

CardTransaction.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CardTransaction;
