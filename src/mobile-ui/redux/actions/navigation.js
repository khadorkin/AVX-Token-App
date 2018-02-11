import * as ACTIONS from 'constants/action_types';
// import { selectHistoryIndex, selectHistoryStack } from 'redux/selectors/navigation';
import { toQueryString } from 'utils/query_params';
import { push, goForward, goBack } from 'connected-react-router';

export function doNavigate(path, params = {}, options = {}) {
  return dispatch => {
    if (!path) {
      // eslint-disable-next-line no-console
      console.warn('No path provided to navigate, refusing to action');
      return;
    }

    let url = path;
    if (params && Object.values(params).length) {
      url += `?${toQueryString(params)}`;
    }

    const { scrollY } = options;

    // dispatch({
    //   type: ACTIONS.HISTORY_NAVIGATE,
    //   data: { url, index: options.index, scrollY },
    // });
    dispatch(
      push(url, {
        url,
        index: options.index,
        scrollY,
      })
    );
  };
}

export const doAuthNavigate = (pathAfterAuth = null, params = {}) => dispatch => {
  if (pathAfterAuth) {
    dispatch({
      type: ACTIONS.CHANGE_AFTER_AUTH_PATH,
      data: {
        path: `${pathAfterAuth}?${toQueryString(params)}`,
      },
    });
  }
  const url = '/auth';
  dispatch(
    push(url, {
      url,
      pathAfterAuth: `${pathAfterAuth}?${toQueryString(params)}`,
    })
  );
};

// export function doHistoryTraverse(dispatch, state, modifier) {
//   const stack = selectHistoryStack(state);
//   const index = selectHistoryIndex(state) + modifier;

//   if (index >= 0 && index < stack.length) {
//     const historyItem = stack[index];
//     dispatch(doNavigate(historyItem.path, {}, { scrollY: historyItem.scrollY, index }));
//   }
// }

export const doHistoryBack = () => dispatch => dispatch(goBack());

export const doHistoryForward = () => dispatch => dispatch(goForward());

export function doRecordScroll(scroll) {
  return dispatch => {
    dispatch({
      type: ACTIONS.WINDOW_SCROLLED,
      data: { scrollY: scroll },
    });
  };
}
