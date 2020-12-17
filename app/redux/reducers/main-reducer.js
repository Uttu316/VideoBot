import * as actionTypes from '../actions/action-types';
const initialState = {
  themeMode: 'dark',
  watchedVideos: [],
  recentKeywords: [],
  recordedVideos: [],
};

export default MainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        themeMode: action.theme,
      };
    case actionTypes.ADD_TO_WATCHED_VIDEOS:
      return {
        ...state,
        watchedVideos: action.videos,
      };
    case actionTypes.ADD_TO_RECENT_KEYWORDS:
      return {
        ...state,
        recentKeywords: action.keywords,
      };
    case actionTypes.UPDATE_RECORDED_VIDEOS:
      return {
        ...state,
        recordedVideos: action.videos,
      };

    default:
      return state;
  }
};
