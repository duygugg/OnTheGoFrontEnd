const initialState = {
    user: null,
    isFetching: false,
    isError: false,
  };
  
  
  const UserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_USER_DETAILS':
        return {
          user: null,
          isFetching: true,
          isError: false,
        };
      case 'SUCCESS_USER_DETAILS':
        return {
          user: action.payload,
          isFetching: false,
          isError: false,
        };
      case 'FAILED_USER_DETAILS':
        return {
          user: null,
          isFetching: false,
          isError: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default UserDetailsReducer;