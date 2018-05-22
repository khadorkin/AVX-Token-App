// @flow
import * as actions from 'constants/action_types';
import { handleActions } from 'utils/redux-utils';
import type { Action } from 'types/redux';

export type MediaState = {
  paused: Boolean,
  positions: {
    [string]: number,
  },
};

const defaultState = { paused: true, positions: {} };

export default handleActions(
  {
    [actions.MEDIA_PLAY]: (state: MediaState) => ({
      ...state,
      paused: false,
    }),

    [actions.MEDIA_PAUSE]: (state: MediaState) => ({
      ...state,
      paused: true,
    }),

    [actions.MEDIA_POSITION]: (state: MediaState, action: Action) => {
      const { outpoint, position } = action.payload;
      return {
        ...state,
        positions: {
          ...state.positions,
          [outpoint]: position,
        },
      };
    },

    [actions.MEDIA_PROGRESS]: (state: MediaState, action: Action) => ({
      ...state,
      ...action.payload,
    }),
  },
  defaultState
);
