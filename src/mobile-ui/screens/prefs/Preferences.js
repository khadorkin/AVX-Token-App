/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, Text, Switch, AsyncStorage } from 'components/core';

import { registerNavigator } from 'redux/router';
import Theme, { LightTheme, DarkTheme } from 'theme';
import styles from './styles/Preferences';

class Preferences extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        // title: 'sideMenu', // for a textual button, provide the button title (label)
        id: 'side-menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        // systemItem: 'action',
        component: 'structure.DrawerButton',
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // true,
      isRefreshing: false,
    };
    registerNavigator('preferences', this.props.navigator);
  }

  componentWillMount() {
    this._retrievePreferences();
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps !== this.props || nextState !== this.state;
  }

  async _retrievePreferences(isRefreshed) {
    const theme = (await AsyncStorage.getItem('Preferences.theme')) || 'dark';
    this.setState({
      // list: this.props.list,
      theme,
      isLoading: false,
    });
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this._retrievePreferences('isRefreshed');
  };

  _onThemeChange = isDark => {
    const theme = isDark ? 'dark' : 'light';
    AsyncStorage.setItem('Preferences.theme', theme);
    Object.assign(Theme, isDark ? DarkTheme : LightTheme);
    this.setState({
      theme,
    });
  };

  render() {
    const { theme, loading } = this.state;
    return (
      <View style={styles.container}>
        <View key="theme" style={styles.item}>
          <Text style={styles.name}>Dark Theme</Text>
          <Switch
            value={theme !== 'light'}
            disabled={loading}
            onValueChange={this._onThemeChange}
          />
        </View>
      </View>
    );
  }
}

Preferences.propTypes = {
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

Preferences.navigatorStyle = {
  ...navigatorStyle,
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
};

export default Preferences;
