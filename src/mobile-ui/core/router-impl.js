/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
// import { syncHistoryWithStore } from 'react-router-redux';

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number,
    children: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  history = createBrowserHistory(this.props);

  render() {
    return <Router history={this.history}>{this.props.children}</Router>;
  }
}

export default BrowserRouter;
