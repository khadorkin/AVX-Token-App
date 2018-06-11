import { StyleSheet } from 'components/core';
import theme from 'theme';

const { textColorBright, textColorDim } = theme;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  overview: {
    marginBottom: 15,
  },
  overviewText: {
    color: textColorDim,
    fontSize: 14,
    paddingTop: 10,
    lineHeight: 22,
  },
  label: {
    color: textColorBright,
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    color: textColorDim,
    fontSize: 14,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
});

export default styles;
