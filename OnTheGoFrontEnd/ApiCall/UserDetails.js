import axios from '../axios';
import {
  startUserDetails,
  successUserDetails,
  failedUserDetails,
} from '../redux/Actions/Actions';

export const userDetailsAPICall = async (user_id, dispatch) => {
  dispatch(startUserDetails());
  try {
    const user = await axios.get(`user/${user_id}`);
    dispatch(successUserDetails(user.data));
    console.log(user.data);
  } catch (error) {
    dispatch(failedUserDetails(error));
    console.log('user details api call error:', error);
  }
};
