import { connect } from 'react-redux';
import { doNavigate } from 'redux/actions/navigation';
import { doResolveUri } from 'redux/actions/content';
// import { selectShowNsfw } from 'redux/selectors/settings';
import { makeSelectClaimForUri, makeSelectMetadataForUri } from 'redux/selectors/claims';
import { makeSelectFileInfoForUri } from 'redux/selectors/file_info';
import { makeSelectIsUriResolving, selectRewardContentClaimIds } from 'redux/selectors/content';
import FileCard from './fileCard';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  fileInfo: makeSelectFileInfoForUri(props.uri)(state),
  obscureNsfw: false, // !selectShowNsfw(state),
  metadata: makeSelectMetadataForUri(props.uri)(state),
  rewardedContentClaimIds: selectRewardContentClaimIds(state, props),
  isResolvingUri: makeSelectIsUriResolving(props.uri)(state),
});

const perform = dispatch => ({
  navigate: (path, params) => dispatch(doNavigate(path, params)),
  resolveUri: uri => dispatch(doResolveUri(uri)),
});

export default connect(select, perform)(FileCard);
