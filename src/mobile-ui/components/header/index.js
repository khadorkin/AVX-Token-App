import { formatCredits } from 'utils/formatCredits';
import { connect } from 'react-redux';
// import { selectIsBackDisabled, selectIsForwardDisabled } from 'redux/selectors/navigation';
import { selectBalance } from 'redux/selectors/wallet';
import { doHistoryBack, doHistoryForward } from 'redux/actions/navigation';
import Header from './header';
// import { doDownloadUpgradeRequested } from 'redux/actions/app';

const select = state => ({
  isBackDisabled: false, // selectIsBackDisabled(state),
  isForwardDisabled: false, // selectIsForwardDisabled(state),
  isUpgradeAvailable: false,
  autoUpdateDownloaded: false,
  balance: formatCredits(selectBalance(state) || 0, 2),
});

const perform = dispatch => ({
  back: () => dispatch(doHistoryBack()),
  forward: () => dispatch(doHistoryForward()),
  // downloadUpgradeRequested: () => dispatch(doDownloadUpgradeRequested()),
});

export default connect(select, perform)(Header);
