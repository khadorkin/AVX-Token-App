import { connect } from 'react-redux';
import { doNavigate } from 'redux/actions/navigation';
import Link from './link';

const perform = dispatch => ({
  doNavigate: (path, params) => dispatch(doNavigate(path, params)),
});

export default connect(null, perform)(Link);
