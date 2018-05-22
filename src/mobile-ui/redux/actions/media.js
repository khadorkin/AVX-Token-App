// @flow
import * as actions from 'constants/action_types';
import type { Dispatch } from 'types/redux';

export const doPlay = (state: Object) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.MEDIA_PLAY,
    payload: state,
  });

export const doPause = (state: Object) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.MEDIA_PAUSE,
    payload: state,
  });

export const onProgress = (state: Object) => (dispatch: Dispatch) =>
  dispatch({
    type: actions.MEDIA_PROGRESS,
    payload: state,
  });
