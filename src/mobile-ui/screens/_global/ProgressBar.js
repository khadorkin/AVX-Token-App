import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center',
  },
});

const ProgressBar = () => (
  <View style={styles.progressBar}>
    <ActivityIndicator size="large" color={Platform.OS === 'ios' ? 'white' : '#EA0000'} />
  </View>
);

export default ProgressBar;
