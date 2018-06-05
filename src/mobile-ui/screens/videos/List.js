/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, ListView, RefreshControl } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as videosActions from './videos.actions';
import CardThree from './components/ListCard';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/VideosList';
import { iconsMap } from '../AppIcons';
import nav from '../_global/nav';

class VideosList extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        // title: 'sideMenu', // for a textual button, provide the button title (label)
        id: 'side-menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        // systemItem: 'action',
        component: 'DrawerButton',
        paasProps: {
          text: 'SideMenu',
          icon: 'md-menu',
          action: () => {
            console.warn('PRESS');
          },
        },
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // true,
      isRefreshing: false,
      currentPage: 1,
      // list: {
      //   results: [],
      // },
    };

    this._viewMovie = this._viewMovie.bind(this);
    this._onRefresh = this._onRefresh.bind(this);

    const { navigator } = this.props;
    nav.set(navigator);
    navigator.setOnNavigatorEvent(this._onNavigatorEvent);
    // navigator.setStyle({
    //   navBarCustomView: 'avxtokenapp.Titlebar',
    //   navBarComponentAlignment: 'fill',
    // });
  }

  componentWillMount() {
    this._retrieveVideosList();
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps !== this.props || nextState !== this.state;
  }

  _retrieveVideosList(isRefreshed) {
    // this.props.actions.retrieveVideosList(this.props.type, this.state.currentPage).then(() => {
    const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    const dataSource = ds.cloneWithRows(this.props.list.results);
    this.setState({
      // list: this.props.list,
      dataSource,
      isLoading: false,
    });
    // });
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _retrieveNextPage = () => {
    if (this.state.currentPage !== this.props.list.total_pages) {
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

  _viewMovie(movieId) {
    this.props.navigator.push({
      screen: 'avxtokenapp.Video',
      passProps: {
        movieId,
      },
      animationType: 'slide-horizontal',
      backButtonHidden: false, // hide the back button altogether (optional)
    });
    // this.props.navigator.showModal({
    //   screen: 'avxtokenapp.Video',
    //   passProps: {
    //     movieId,
    //   },
    //   backButtonHidden: true,
    //   navigatorButtons: {
    //     rightButtons: [
    //       {
    //         id: 'close',
    //         icon: iconsMap['ios-arrow-round-down'],
    //       },
    //     ],
    //   },
    // });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveVideosList('isRefreshed');
  }

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

  render() {
    return this.state.isLoading ? (
      <View style={styles.progressBar}>
        <ProgressBar />
      </View>
    ) : (
      <ListView
        style={styles.container}
        enableEmptySections
        onEndReached={this._retrieveNextPage}
        onEndReachedThreshold={1200}
        dataSource={this.state.dataSource}
        renderRow={rowData => <CardThree info={rowData} viewMovie={this._viewMovie} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
        renderFooter={this._renderFooter}
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
  actions: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
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
    list: {
      total_pages: 1,
      results: videos,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(videosActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);
