import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleBar: {
    flex: 1,
    justifyContent: 'start',
  },
});

class TitleBar extends PureComponent {
  render() {
    const { title = 'AvxToken' } = this.props;
    return (
      <View style={styles.titleBar}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default TitleBar;
