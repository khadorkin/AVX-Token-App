/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'components/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { registerNavigator } from 'redux/router';
import Group from './Group';
import ProgressBar from '../../_global/ProgressBar';
import styles from '../styles/List';

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

  _renderItem = ({ item }) => <Group info={item} viewMovie={this._viewMovie} />;

  _renderSeparator() {
    return <View style={styles.seperator} />;
  }

  _keyExtractor(item) {
    return item.name;
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
        data={this.props.groups}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        ListFooterComponent={this._renderFooter}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

VideosList.propTypes = {
  groups: PropTypes.array.isRequired,
  navigator: PropTypes.object,
};

function mapStateToProps() {
  return {
    groups: [
      {
        name: 'Comedy',
        items: [],
      },
      {
        name: 'Animation',
        items: [],
      },
      {
        name: 'Sci-Fi',
        items: [],
      },
    ],
  };
}

export default connect(mapStateToProps)(VideosList);
