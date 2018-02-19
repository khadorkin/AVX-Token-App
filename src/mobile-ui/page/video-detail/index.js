import { connect } from 'react-redux';
import { doResolveUri } from 'redux/actions/content';
import { makeSelectCurrentParam } from 'redux/selectors/navigation';
// import { selectShowNsfw } from 'redux/selectors/settings';
import { selectClaim, selectMetadata } from 'redux/selectors/claims';
import { selectFileInfo } from 'redux/selectors/file_info';
import { selectRewardContentClaimIds } from 'redux/selectors/content';
import FileCard from './video';

const selectUri = makeSelectCurrentParam('uri');

const select = (state, props) => ({
  uri: selectUri(state),
  claim: selectClaim(state),
  fileInfo: selectFileInfo(state),
  obscureNsfw: false, // !selectShowNsfw(state),
  metadata: selectMetadata(state),
  rewardedContentClaimIds: selectRewardContentClaimIds(state, props),
  // isResolvingUri: makeSelectIsUriResolving(props.uri)(state),
});

const perform = dispatch => ({
  resolveUri: uri => dispatch(doResolveUri(uri)),
});

export default connect(select, perform)(FileCard);
