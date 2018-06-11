/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, FlatList, RefreshControl } from 'components/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { registerNavigator } from 'redux/router';
import ListCard from './components/ListCard';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/List';

class VideosList extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        id: 'side-menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        systemItem: 'action',
        component: 'structure.DrawerButton',
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

    const {
      props: { navigator },
    } = this;
    if (navigator) {
      registerNavigator('video', navigator);
      this.clearNavigatorEvent = navigator.addOnNavigatorEvent(this._onNavigatorEvent);
    }
  }

  componentWillMount() {
    this._retrieveVideosList();
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps !== this.props || nextState !== this.state;
  }

  componentWillUnmount() {
    if (this.clearNavigatorEvent) this.clearNavigatorEvent();
  }

  _retrieveVideosList(isRefreshed) {
    // this.props.actions.retrieveVideosList(this.props.type, this.state.currentPage).then(() => {
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
    this.props.dispatch(
      push(`/video/${movieId}`, {
        movieId,
        _options: {
          animationType: 'slide-horizontal',
          backButtonHidden: false,
        },
      })
    );
  };

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this._retrieveVideosList('isRefreshed');
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

  _renderItem = ({ item }) => <ListCard info={item} viewMovie={this._viewMovie} />;

  _renderSeparator() {
    return <View style={styles.seperator} />;
  }

  _keyExtractor(item) {
    return item.infohash;
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
        keyExtractor={this._keyExtractor}
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

VideosList.propTypes = {
  list: PropTypes.array.isRequired,
  total_pages: PropTypes.number,
  navigator: PropTypes.object,
  dispatch: PropTypes.func,
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

VideosList.navigatorStyle = {
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

export default connect(mapStateToProps)(VideosList);
