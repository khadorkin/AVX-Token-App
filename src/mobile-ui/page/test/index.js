import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TestView from './view';

export default withRouter(
  connect(({ app }) => ({
    counter: app.counter,
  }))(TestView)
);
