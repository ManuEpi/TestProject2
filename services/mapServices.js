import axios from 'axios';
import * as Constants from '../config/constants'

// Make Axios Call to get all restaurants around us
export const getRestaurants = (currentLatitude, currentLongitude) => {
    return axios.get(Constants.BASE_URL + `/api?lat=${currentLatitude}&long=${currentLongitude}`);
};
