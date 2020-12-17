import * as actionTypes from './action-types';

export const changeTheme = (theme) => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

export const addToWatchedVideos = (videos) => {
  return {
    type: actionTypes.ADD_TO_WATCHED_VIDEOS,
    videos,
  };
};

export const addToRecentKeywords = (keywords) => {
  return {
    type: actionTypes.ADD_TO_RECENT_KEYWORDS,
    keywords,
  };
};

export const updateRecordedVideos = (videos) => {
  return {
    type: actionTypes.UPDATE_RECORDED_VIDEOS,
    videos,
  };
};
