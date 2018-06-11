/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View, Text, RefreshControl, FlatList } from 'components/core';
import { connect } from 'react-redux';

import { selectFormattedBalance } from 'redux/selectors/wallet';
import { registerNavigator } from 'redux/router';
// import ProgressBar from '../_global/ProgressBar';
import CardTransaction from './components/CardTransaction';
import styles from './styles/Wallet';

class Wallet extends Component {
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
      // isLoading: false, // true,
      isRefreshing: false,
    };
    registerNavigator('wallet', this.props.navigator);
  }

  componentWillMount() {
    this._retrieveWallet();
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps !== this.props || nextState !== this.state;
  }

  _retrieveWallet(isRefreshed) {
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true });
    this._retrieveWallet('isRefreshed');
  };

  _keyExtractor(item) {
    return item.name;
  }

  renderItem({ item }) {
    return <CardTransaction title={item.name} value={item.value} />;
  }

  render() {
    const {
      formattedBalance,
      wallet: { transactions },
    } = this.props;
    return (
      <View style={styles.container}>
        <View key="balance" style={styles.balance}>
          <Text style={styles.balanceValue}>{formattedBalance}</Text>
          <Text style={styles.balanceCurrency}>AVX&nbsp;</Text>
        </View>
        <View key="trasactionSep" style={styles.seperator} />
        <FlatList
          style={styles.transactions}
          data={transactions}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
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
      </View>
    );
  }
}

Wallet.propTypes = {
  formattedBalance: PropTypes.string.isRequired,
  wallet: PropTypes.object,
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

Wallet.navigatorStyle = {
  ...navigatorStyle,
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
};

function mapStateToProps(state, { navigator }) {
  return {
    formattedBalance: selectFormattedBalance(state),
    wallet: state.wallet,
    navigator,
  };
}

export default connect(mapStateToProps)(Wallet);
