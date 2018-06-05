import React from 'react';
import Navigation from 'react-native-navigation';
import PropRegistry from 'react-native-navigation/src/PropRegistry';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import nav from './nav';

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const navigateBack = () => {
  console.log(Navigation);
};

const openDrawer = () => {
  const navigator = nav.get();
  navigator.toggleDrawer({
    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
    to: 'open', // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
  });
};

// Our custom component we want as a button in the nav bar
const TitlebarButton = props => {
  const { text = 'text', color = '#fcfcfc', size = 24, icon, action } = {
    ...props,
    ...PropRegistry.load(props.screenInstanceID || props.passPropsKey),
  };
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: 'rgba(0,0,0,0)' }]}
      onPress={action}
    >
      <View style={styles.button}>
        <Icon name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export const DrawerButton = () => <TitlebarButton icon="md-menu" action={openDrawer} />;
export const BackButton = () => <TitlebarButton icon="md-back" action={navigateBack} />;

export default TitlebarButton;
