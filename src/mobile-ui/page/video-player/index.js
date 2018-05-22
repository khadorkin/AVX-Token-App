import { connect } from 'react-redux';
import { doResolveUri } from 'redux/actions/content';
import { selectMetadataForId } from 'redux/selectors/claims';
import { addTorrent } from 'redux/actions/webtorrent';
import FileCard from './video';

const select = (state, { match: { params = {} } }) => ({
  metadata: selectMetadataForId(state.claims, params.infoHash),
  ...params,
});

const perform = dispatch => ({
  resolveUri: uri => dispatch(doResolveUri(uri)),
  addTorrent: torrentId => dispatch(addTorrent(torrentId)),
});

export default connect(select, perform)(FileCard);
