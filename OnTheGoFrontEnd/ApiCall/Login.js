import axios from '../axios';
import {startLogin, successLogin, failedLogin} from '../redux/Actions/Actions';
import jwt_decode from 'jwt-decode';

export const userLoginAPICall = async (userCredentials, dispatch) => {
  dispatch(startLogin());
  try {
    const user = await axios.post('token/', userCredentials);
    const user_id = jwt_decode(user.data.user.access).user_id;
    let userData = await userDetailsAPICall(user_id);

    dispatch(successLogin(userData));
    console.log('user data from api:', user.data);
  } catch (error) {
    dispatch(failedLogin(error));
    console.log('user log api call error:', error);
  }
};

const userDetailsAPICall = async user_id => {
  try {
    const user = await axios.get(`user/${user_id}`);
    return user.data;

    console.log(user.data);
  } catch (error) {
    console.log('user details api call error:', error);
    return null;
  }
};
