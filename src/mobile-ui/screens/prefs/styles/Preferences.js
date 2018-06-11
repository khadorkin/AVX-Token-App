import { Platform, StyleSheet } from 'components/core';
import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingLeft: 24,
    paddingRight: 48,
    paddingTop: 24,
    maxWidth: 560,
    alignSelf: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  seperator: {
    marginTop: 10,
    backgroundColor: '#8E8E8E',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    color: theme.textColor,
    fontSize: 16,
  },
  value: {
    flex: 0,
    color: theme.textColor,
  },
});

export default styles;
