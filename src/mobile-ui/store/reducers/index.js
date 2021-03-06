import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

// import availability from './availability';
// import content from './content';
// import claims from './claims';
// import costInfo from './costInfo';
// import fileInfo from './fileInfo';
// import media from './media';
// import rewards from './rewards';
// import search from './search';
// import settings from './settings';
// import shapeShift from './shapeShift';
// import subscriptions from './subscriptions';
// import user from './user';
import wallet from './wallet';
import webtorrent from './webtorrent';
import videosList from './videosList';

export default combineReducers({
  // availability,
  // content,
  // claims,
  // costInfo,
  // fileInfo,
  // media,
  // rewards,
  // search,
  // settings,
  // shapeShift,
  // subscriptions,
  // user,
  wallet,
  webtorrent,
  videosList,
  // routing: routerReducer,
});
