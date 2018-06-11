/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'components/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { navigator, getScreenAt } from 'redux/router';
import { getHistory } from '../../store/history';

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    minWidth: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 3,
    paddingBottom: 5,
  },
});

const openDrawer = () => {
  navigator().toggleDrawer({
    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
    to: 'open', // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
  });
};

// Our custom component we want as a button in the nav bar
const TitlebarButton = props => {
  const { color = '#fcfcfc', size = 24, icon, action, title } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: 'rgba(0,0,0,0)' }]}
      onPress={action}
    >
      <View style={styles.button}>
        <Icon name={icon} size={size} color={color} />
        {title ? <Text style={[styles.title, { color }]}>{title}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export const DrawerButton = () => <TitlebarButton icon="md-menu" action={openDrawer} />;

export class BackButton extends React.PureComponent {
  goBack = () => {
    setTimeout(() => getHistory().goBack(), 50);
  };

  render() {
    const previousScreen = getScreenAt(-1);
    return TitlebarButton({
      icon: 'md-arrow-back',
      action: this.goBack,
      title: previousScreen.title,
    });
  }
}

export default connect(({ router: { location } }) => ({ location }))(TitlebarButton);
