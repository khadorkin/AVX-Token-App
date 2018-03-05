import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import wallet from './wallet';

export default withRouter(
  connect(({ app }) => ({
    counter: app.counter,
  }))(wallet)
);
