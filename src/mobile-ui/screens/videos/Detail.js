/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'components/core';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import Swiper from 'react-native-swiper';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import theme from 'theme';

import Info from './components/Info';
// import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Movie';

const gradient = [
  `rgba(${theme.backgroundColorRgb}, 0.3)`,
  `rgba(${theme.backgroundColorRgb}, 0.3)`,
  `rgba(${theme.backgroundColorRgb}, 0.8)`,
];

class VideoDetail extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        systemItem: 'action',
        component: 'structure.BackButton',
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      castsTabHeight: null,
      // heightAnim: null,
      infoTabHeight: null,
      isLoading: false, //true,
      // isRefreshing: false,
      // showSimilarMovies: true,
      trailersTabHeight: null,
      tab: 0,
      // youtubeVideos: [],
    };
  }

  componentWillMount() {
    this._retrieveDetails();
  }

  _retrieveDetails() {
    // this.props.actions.retrieveMovieDetails(this.props.movieId).then(() => {
    //   this._retrieveYoutubeDetails();
    // });
    // if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _retrieveSimilarMovies() {
    // this.props.actions.retrieveSimilarMovies(this.props.movieId, 1);
  }

  _onRefresh = () => {
    // this.setState({ isRefreshing: true });
    this._retrieveDetails('isRefreshed');
  };

  _onScroll = event => {
    const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
    if (contentOffsetY > 150) {
      this._toggleNavbar('hidden');
    } else {
      this._toggleNavbar('shown');
    }
  };

  _toggleNavbar(status) {
    this.props.navigator.toggleNavBar({
      to: status,
      animated: true,
    });
  }

  // ScrollView onContentSizeChange prop
  _onContentSizeChange = (width, height) => {
    if (this.state.tab === 0 && this.state.infoTabHeight === this.state.castsTabHeight) {
      this.setState({ infoTabHeight: height });
    }
  };

  _viewMovie = movieId => {
    this.props.navigator.push({
      screen: 'movieapp.Movie',
      passProps: {
        movieId,
      },
    });
  };

  _onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
    }
  };

  render() {
    const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
    const { details } = this.props;
    const info = details;

    let height;
    if (this.state.tab === 0) height = this.state.infoTabHeight;
    if (this.state.tab === 1) height = this.state.castsTabHeight;
    if (this.state.tab === 2) height = this.state.trailersTabHeight;

    return this.state.isLoading ? (
      <View style={styles.progressBar}>{/*<ProgressBar />*/}</View>
    ) : (
      <ScrollView
        style={styles.container}
        onScroll={this._onScroll}
        scrollEventThrottle={100}
        onContentSizeChange={this._onContentSizeChange}
      >
        <View style={{ height }}>
          <View style={styles.swiper}>
            <Image source={info.poster} style={styles.imageBackdrop} />
            <LinearGradient colors={gradient} style={styles.linearGradient} />
          </View>
          <View style={styles.cardContainer}>
            <Image source={info.poster} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{info.original_title}</Text>
              <Text style={styles.cardTagline}>{info.tagline}</Text>
              <View style={styles.cardGenre}>
                {info.genres.map(item => (
                  <Text key={item.id} style={styles.cardGenreItem}>
                    {item.name}
                  </Text>
                ))}
              </View>
              <View style={styles.cardNumbers}>
                <View style={styles.cardStar}>
                  {iconStar}
                  <Text style={styles.cardStarRatings}>8.9</Text>
                </View>
                <Text style={styles.cardRunningHours} />
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Info tabLabel="INFO" info={info} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

VideoDetail.navigatorStyle = {
  navBarTransparent: true,
  drawUnderNavBar: true,
  navBarTranslucent: true,
  statusBarHidden: true,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
};

VideoDetail.propTypes = {
  details: PropTypes.object,
  navigator: PropTypes.object,
};

function mapStateToProps({ videosList: { videos } }, ownProps) {
  const movieId = ownProps.movieId || ((ownProps.match || {}).params || {}).movieId;
  return {
    movieId,
    details: videos.find(vid => vid.infohash === movieId),
    // similarMovies: state.movies.similarMovies,
  };
}

export default connect(mapStateToProps)(VideoDetail);
