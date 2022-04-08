export const startLogin = () => {
  return {
    type: 'START_LOGIN',
  };
};

export const successLogin = user => {
  return {
    type: 'SUCCESS_LOGIN',
    payload: user,
  };
};

export const failedLogin = error => {
  return {type: 'FAILED_LOGIN', payload: error};
};

export const startUserDetails = () => {
  return {type: 'START_USER_DETAILS'};
};

export const successUserDetails = user => {
  return {type: 'SUCCESS_USER_DETAILS', payload: user};
};

export const updateUserDetails = user => {
  return {type: 'UPDATE_USER_DETAILS', payload: user};
};
export const failedUserDetails = error => {
  return {type: 'FAILED_USER_DETAILS', payload: error};
};
export const updateUserImage = image => {
  return {type: 'UPDATE_PROFILE_IMG', payload: image};
};

export const GET_PROFILE_IMG = 'GET_PROFILE_IMG';

export const GET_PERMISSONS = 'GET_PERMISSIONS';
export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';
