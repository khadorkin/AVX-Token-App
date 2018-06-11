import { StyleSheet } from 'components/core';
import theme from 'theme';

const { backgroundColor, textColorBright } = theme;

const styles = StyleSheet.create({
  textStyle: {
    color: textColorBright,
    paddingTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  underlineStyle: {
    backgroundColor: '#EA0000',
  },
  tabBar: {
    backgroundColor: '#131313',
  },
  contentContainer: {
    flex: 1,
    marginTop: 157,
  },
  progressBar: {
    backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor,
  },
  swiper: {
    // position: 'absolute',
    // flex: 1
  },
  linearGradient: {
    top: 0,
    left: 0,
    right: 0,
    height: 248,
    position: 'absolute',
  },
  imageBackdrop: {
    // flex: 1,
    height: 248,
    backgroundColor,
  },
  cardContainer: {
    flex: 1,
    position: 'absolute',
    top: 200,
    right: 16,
    left: 16,
    flexDirection: 'row',
  },
  cardImage: {
    height: 184,
    width: 135,
    borderRadius: 3,
  },
  cardDetails: {
    paddingLeft: 10,
    flex: 1,
    paddingTop: 50,
  },
  cardTitle: {
    color: textColorBright,
    fontSize: 19,
    fontWeight: '500',
    paddingTop: 10,
  },
  cardTagline: {
    color: textColorBright,
    fontSize: 15,
  },
  cardGenre: {
    flexDirection: 'row',
  },
  cardGenreItem: {
    textAlign: 'left',
    fontSize: 11,
    marginRight: 5,
    color: textColorBright,
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
});

export default styles;
