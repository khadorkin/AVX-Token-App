import { connect } from 'react-redux';
import { Platform } from 'components/core';
import {
  selectPageTitle,
  // selectHistoryIndex,
  // selectActiveHistoryEntry,
} from 'redux/selectors/navigation';
// import { selectUser } from 'redux/selectors/user';
import { doAlertError } from 'redux/actions/app';
import { withRouter } from 'react-router';
import App from './view';

const select = state => ({
  isBrowser: Platform.OS,
  pageTitle: selectPageTitle(state),
  // user: selectUser(state),
  // currentStackIndex: selectHistoryIndex(state),
  // currentPageAttributes: selectActiveHistoryEntry(state),
});

const perform = dispatch => ({
  alertError: errorList => dispatch(doAlertError(errorList)),
});

export default withRouter(connect(select, perform)(App));
