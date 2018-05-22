import { connect } from 'react-redux';
import Video from './video';

const select = (state, props) => ({
  torrent: state.webtorrent && state.webtorrent.torrents[props.infoHash],
  progress: state.webtorrent && state.webtorrent.progress[props.infoHash],
});
const map = () => ({});

export default connect(select, map)(Video);
