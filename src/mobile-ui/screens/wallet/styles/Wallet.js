import { Platform, StyleSheet } from 'components/core';

import theme from 'theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingLeft: 24,
    paddingRight: 24,
    maxWidth: 560,
    alignSelf: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop: 83,
      },
    }),
  },
  balance: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingTop: 26,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },
  balanceCurrency: {
    color: theme.primaryColor,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: -4,
  },
  balanceValue: {
    color: theme.primaryColor,
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'right',
  },
  progressBar: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    marginVertical: 10,
    backgroundColor: '#6c6c6c',
    height: 1,
    flex: 0,
  },
});

export default styles;
