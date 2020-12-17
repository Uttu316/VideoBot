import {API_KEY} from '../constants/api.constants';

export const getConfig = (query) => {
  return {
    method: 'get',
    url: 'https://api.pexels.com/videos/search?query=' + query + '&per_page=4',
    headers: {
      Authorization: API_KEY,
    },
  };
};
