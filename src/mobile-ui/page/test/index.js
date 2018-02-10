import { connect } from 'react-redux';
import TestView from './view';

export default connect(({ app }) => ({
  counter: app.counter,
}))(TestView);
