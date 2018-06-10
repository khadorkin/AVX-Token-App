/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
// import ScrollableTabView from 'react-native-scrollable-tab-view';
// import Swiper from 'react-native-swiper';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Info from './components/Info';
// import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Movie';

class VideoDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      castsTabHeight: null,
      // heightAnim: null,
      infoTabHeight: null,
      isLoading: false, //true,
      isRefreshing: false,
      // showSimilarMovies: true,
      trailersTabHeight: null,
      tab: 0,
      // youtubeVideos: [],
    };
  }

  componentWillMount() {
    this._retrieveDetails();
  }

  _retrieveDetails(isRefreshed) {
    // this.props.actions.retrieveMovieDetails(this.props.movieId).then(() => {
    //   this._retrieveYoutubeDetails();
    // });
    if (isRefreshed && this.setState({ isRefreshing: false }));
    // window.requestAnimationFrame(() => {
    //   this.setState({ isLoading: false });
    // });
  }

  _retrieveSimilarMovies() {
    // this.props.actions.retrieveSimilarMovies(this.props.movieId, 1);
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
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
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']}
              style={styles.linearGradient}
            />
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
  actions: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  navigator: PropTypes.object,
  movieId: PropTypes.string.isRequired,
};

function mapStateToProps({ videosList: { videos } }, ownProps) {
  const { movieId, details } = ownProps;
  return {
    movieId,
    details: details || videos.find(vid => vid.infohash === movieId),
    // similarMovies: state.movies.similarMovies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}, //bindActionCreators(moviesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
