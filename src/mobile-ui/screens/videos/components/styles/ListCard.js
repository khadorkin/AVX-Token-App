import { StyleSheet, Platform } from 'components/core';
import theme from 'theme';

const { backgroundColor, textColorBright, textColorDim } = theme;

const height = Platform.OS === 'web' ? 208 : 248;
const heightLarge = 348;

const styles = StyleSheet.create({
  card: {},
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height,
    position: 'absolute',
  },
  imageBackdrop: {
    // flex: 1,
    height,
    backgroundColor,
  },
  linearGradientLarge: {
    top: 0,
    left: 0,
    right: 0,
    height: heightLarge,
    position: 'absolute',
  },
  imageBackdropLarge: {
    // flex: 1,
    height: heightLarge,
    backgroundColor,
  },
  cardContainer: {
    position: 'absolute',
    top: 32,
    right: 16,
    left: 16,
    flexDirection: 'row',
    ...Platform.select({
      web: {
        top: 12,
      },
    }),
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
  },
  cardTitle: {
    color: textColorBright,
    fontSize: 19,
    fontWeight: '500',
    paddingTop: 10,
  },
  cardGenre: {
    flexDirection: 'row',
  },
  cardGenreItem: {
    fontSize: 11,
    marginRight: 5,
    color: textColorBright,
  },
  cardDescription: {
    color: textColorDim,
    fontSize: 13,
    marginTop: 5,
    overflow: 'hidden',
  },
  cardNumbers: {
    flexDirection: 'row',
    marginTop: 5,
  },
  cardStar: {
    flexDirection: 'row',
  },
  cardStarRatings: {
    marginLeft: 5,
    fontSize: 12,
    color: textColorBright,
  },
  cardRunningHours: {
    marginLeft: 5,
    fontSize: 12,
  },
  viewButton: {
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#EA0000',
    width: 100,
    height: 36,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fafafa',
    height: '100%',
  },
});

export default styles;
