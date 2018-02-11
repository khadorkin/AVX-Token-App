import { connect } from 'react-redux';
import { Platform } from 'react-native';
import {
  selectPageTitle,
  // selectHistoryIndex,
  // selectActiveHistoryEntry,
} from 'redux/selectors/navigation';
// import { selectUser } from 'redux/selectors/user';
import { doAlertError } from 'redux/actions/app';
import { doRecordScroll } from 'redux/actions/navigation';
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
  recordScroll: scrollPosition => dispatch(doRecordScroll(scrollPosition)),
});

export default withRouter(connect(select, perform)(App));
