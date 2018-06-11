/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, StyleSheet } from 'components/core';
import { connect } from 'react-redux';
import theme from 'theme';

import { registerNavigator } from 'redux/router';
import ListCard from '../components/ListCard';
import ProgressBar from '../../_global/ProgressBar';
import styles from '../styles/List';

const groupStyles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: '500',
    color: theme.textColorDim,
    paddingLeft: 12,
    paddingTop: 24,
    paddingBottom: 10,
  },
});

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

  _renderItem = ({ item }) => <ListCard info={item} viewMovie={this.props.viewMovie} />;

  _renderSeparator() {
    return <View style={styles.seperator} />;
  }

  _keyExtractor(item) {
    return item.infohash;
  }

  render() {
    const {
      info: { name },
    } = this.props;
    return [
      <Text style={groupStyles.title} key={name}>
        {name}
      </Text>,
      <FlatList
        key="list"
        style={styles.container}
        enableEmptySections
        horizontal
        onEndReached={this._retrieveNextPage}
        data={this.props.list}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={this._keyExtractor}
      />,
    ];
  }
}

VideosList.propTypes = {
  list: PropTypes.array.isRequired,
  total_pages: PropTypes.number,
  navigator: PropTypes.object,
  info: PropTypes.object,
};

function mapStateToProps({ videosList: { videos } }, { info }) {
  return {
    info,
    type: 'video',
    total_pages: 1,
    list: videos,
  };
}

export default connect(mapStateToProps)(VideosList);
