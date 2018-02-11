import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import app from './app';
import availability from './availability';
import content from './content';
import claims from './claims';
import costInfo from './costInfo';
import fileInfo from './fileInfo';
import media from './media';
import rewards from './rewards';
import search from './search';
import settings from './settings';
import shapeShift from './shapeShift';
import subscriptions from './subscriptions';
import user from './user';
import wallet from './wallet';

export default combineReducers({
  app,
  availability,
  content,
  claims,
  costInfo,
  fileInfo,
  media,
  rewards,
  search,
  settings,
  shapeShift,
  subscriptions,
  user,
  wallet,
  // routing: routerReducer,
});
