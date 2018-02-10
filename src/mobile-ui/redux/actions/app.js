/* eslint-disable import/no-commonjs */
import * as ACTIONS from 'constants/action_types';
import * as MODALS from 'constants/modal_types';
// import Path from 'path';
// import { doFetchRewardedContent } from 'redux/actions/content';
// import { doFetchFileInfosAndPublishedClaims } from 'redux/actions/file_info';
import { doAuthNavigate } from 'redux/actions/navigation';
// import { doFetchDaemonSettings } from 'redux/actions/settings';
// import { doAuthenticate } from 'redux/actions/user';
// import { doBalanceSubscribe } from 'redux/actions/wallet';

import {
  selectCurrentModal,
  // selectIsUpgradeSkipped,
  // selectRemoteVersion,
  // selectUpdateUrl,
  // selectUpgradeDownloadItem,
  // selectUpgradeDownloadPath,
  // selectUpgradeFilename,
  // selectAutoUpdateDeclined,
} from 'redux/selectors/app';

// const { lbrySettings: config } = require('package.json');

export function doOpenModal(modal, modalProps = {}) {
  return {
    type: ACTIONS.OPEN_MODAL,
    data: {
      modal,
      modalProps,
    },
  };
}

export function doCloseModal() {
  return {
    type: ACTIONS.CLOSE_MODAL,
  };
}

export function doAlertError(errorList) {
  return dispatch => {
    dispatch({
      type: ACTIONS.OPEN_MODAL,
      data: {
        modal: MODALS.ERROR,
        modalProps: { error: errorList },
      },
    });
  };
}

export function doDaemonReady() {
  return dispatch => {
    // dispatch(doAuthenticate());
    dispatch({ type: ACTIONS.DAEMON_READY });
    // dispatch(doFetchDaemonSettings());
    // dispatch(doBalanceSubscribe());
    // dispatch(doFetchFileInfosAndPublishedClaims());
    // dispatch(doFetchRewardedContent());
  };
}

export function doShowSnackBar(data) {
  return {
    type: ACTIONS.SHOW_SNACKBAR,
    data,
  };
}

export function doRemoveSnackBarSnack() {
  return {
    type: ACTIONS.REMOVE_SNACKBAR_SNACK,
  };
}

export function doClearCache() {
  return () => {
    window.cacheStore.purge();

    return Promise.resolve();
  };
}

export function doChangeVolume(volume) {
  return dispatch => {
    dispatch({
      type: ACTIONS.VOLUME_CHANGED,
      data: {
        volume,
      },
    });
  };
}

export function doConditionalAuthNavigate(newSession) {
  return (dispatch, getState) => {
    const state = getState();
    if (newSession || selectCurrentModal(state) !== 'email_collection') {
      dispatch(doAuthNavigate());
    }
  };
}
