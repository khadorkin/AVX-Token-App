import { Platform, StyleSheet } from 'components/core';
import theme from 'theme';

const { backgroundColor } = theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  progressBar: {
    backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    marginTop: 10,
    backgroundColor: '#8E8E8E',
  },
  footer: {
    height: 24,
    flex: 0,
    ...Platform.select({
      ios: {
        height: 100,
      },
    }),
  },
});

export default styles;
