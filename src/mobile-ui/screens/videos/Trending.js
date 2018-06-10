/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import CardThree from './components/ListCard';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/List';
import nav from '../_global/nav';

class VideosTrending extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'side-menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        systemItem: 'action',
        component: 'DrawerButton',
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // true,
      isRefreshing: false,
      currentPage: 1,
    };

    nav.set(this.props.navigator);
    this.clearNavigatorEvent = this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
  }

  componentWillMount() {
    this._retrieveVideosTrending();
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps !== this.props || nextState !== this.state;
  }

  componentWillUnmount() {
    this.clearNavigatorEvent();
  }

  _retrieveVideosTrending(isRefreshed) {
    // this.props.actions.retrieveVideosTrending(this.props.type, this.state.currentPage).then(() => {
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _retrieveNextPage = () => {
    if (this.state.currentPage !== this.props.total_pages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
      // let page;
      // if (this.state.currentPage === 1) {
      //   page = 2;
      //   this.setState({ currentPage: 2 });
      // } else {
      //   page = this.state.currentPage + 1;
      // }
    }
  };

  _viewMovie = details => {
    const movieId = details.infohash;
    this.props.navigator.push({
      screen: 'avxtokenapp.VideosTrending/Detail',
      passProps: {
        movieId,
        details,
      },
      animationType: 'slide-horizontal',
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  };

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this._retrieveVideosTrending('isRefreshed');
  };

  _onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
    }
  };

  _renderFooter = () => {
    if (!this.isLoading) {
      return <View style={styles.footer} />;
    }
    return (
      <View style={{ height: 50 }}>
        <ProgressBar />
      </View>
    );
  };

  _renderItem = ({ item }) => <CardThree info={item} viewMovie={this._viewMovie} />;

  _renderSeparator() {
    return <View style={styles.seperator} />;
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.progressBar}>
        <ProgressBar />
      </View>
    ) : (
      <FlatList
        style={styles.container}
        enableEmptySections
        onEndReached={this._retrieveNextPage}
        data={this.props.list}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            colors={['#EA0000']}
            tintColor="white"
            title="loading..."
            titleColor="white"
            progressBackgroundColor="white"
          />
        }
      />
    );
  }
}

VideosTrending.propTypes = {
  list: PropTypes.array.isRequired,
  total_pages: PropTypes.number,
  navigator: PropTypes.object,
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
  navigatorStyle = {
    navBarTranslucent: true,
    drawUnderNavBar: true,
  };
} else {
  navigatorStyle = {
    navBarBackgroundColor: '#0a0a0a',
  };
}

VideosTrending.navigatorStyle = {
  ...navigatorStyle,
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
};

function mapStateToProps({ videosList: { videos } }) {
  return {
    type: 'video',
    total_pages: 1,
    list: videos,
  };
}

export default connect(mapStateToProps)(VideosTrending);
