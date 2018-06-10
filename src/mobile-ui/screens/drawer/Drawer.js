/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { navigator } from '../navigation';
// import nav from '../_global/nav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    justifyContent: 'center',
  },
  drawerList: {},
  drawerListIcon: {
    width: 27,
  },
  drawerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },
  drawerListItemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 23,
    paddingLeft: 15,
    flex: 1,
  },
  drawerSpacer: {
    flexBasis: '30%',
    flex: 1,
  },
  linearGradient: {
    // top: 0,
    // left: 0,
    // right: 0,
    // height: 248,
    // position: 'absolute'
    flex: 1,
  },
  _version: {
    color: '#3c3c3c',
    position: 'absolute',
    bottom: 25,
    marginLeft: 53,
  },
});

const iconSize = 26;
const iconColor = '#9f9f9f';

class Drawer extends PureComponent {
  constructor(props) {
    super(props);
    this.clearNavigatorEvent = this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
  }

  componentWillUnmount() {
    this.clearNavigatorEvent();
  }

  _onNavigatorEvent = event => {
    console.warn('Drawer', event.id, event.type, event.link);
    if (event.type === 'DeepLink') {
      const [, tabName, ...pages] = event.link.split('/');
      const tabIndex = navigator.findTab(tabName);
      if (tabIndex !== -1) {
        console.log('Drawer.handleDeepLink', tabName, pages);
        this.props.navigator.switchToTab({ tabIndex });
      }
    }
  };

  _goTo = (screen, options = {}) => {
    this._toggleDrawer();
    const tabIndex = navigator.findTab(screen);
    if (tabIndex === -1) {
      console.error(`Unable to find tab for ${screen}`);
      return;
    }
    this.props.navigator.switchToTab({
      tabIndex,
      ...options,
    });
  };

  _goToTrending = () => {
    this._goTo('avxtokenapp.VideosTrending');
  };

  _goToVideos = () => {
    this._goTo('avxtokenapp.VideosList');
  };

  _goToWallet = () => {
    this._goTo('avxtokenapp.Wallet');
  };

  _goToPreferences = () => {
    this._goTo('avxtokenapp.Preferences');
  };

  _toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: true,
    });
  }

  render() {
    return (
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0,0,0, 1)']}
        style={styles.linearGradient}
      >
        <View style={styles.container}>
          <View style={styles.drawerList}>
            <View style={styles.drawerSpacer} />
            <TouchableOpacity onPress={this._goToTrending}>
              <View style={styles.drawerListItem}>
                <MaterialIcon
                  name="trending-up"
                  size={iconSize}
                  color={iconColor}
                  style={[styles.drawerListIcon, { paddingLeft: 2 }]}
                />
                <Text style={styles.drawerListItemText}>Trending</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToVideos}>
              <View style={styles.drawerListItem}>
                <MaterialIcon
                  name="video-library"
                  size={iconSize}
                  color={iconColor}
                  style={[styles.drawerListIcon, { marginLeft: -1, marginRight: 1 }]}
                />
                <Text style={styles.drawerListItemText}>Videos</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._goToWallet}>
              <View style={styles.drawerListItem}>
                <MaterialIcon
                  name="account-balance-wallet"
                  size={iconSize}
                  color={iconColor}
                  style={styles.drawerListIcon}
                />
                <Text style={styles.drawerListItemText}>Wallet</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.drawerSpacer} />
            <TouchableOpacity onPress={this._goToPreferences}>
              <View style={styles.drawerListItem}>
                <MaterialIcon
                  name="settings"
                  size={iconSize}
                  color={iconColor}
                  style={styles.drawerListIcon}
                />
                <Text style={styles.drawerListItemText}>Preferences</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles._version}>{/* 'v1.0.0' */}</Text>
        </View>
      </LinearGradient>
    );
  }
}

Drawer.propTypes = {
  navigator: PropTypes.object,
};

export default Drawer;
