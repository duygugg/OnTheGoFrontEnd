import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../axios';

export const ProfileContext = React.createContext();

const ProfileContextProvider = props => {
  // Hook to store response data retrieved from api call
  // Loading states whether api call has finished its execution
  // User stores user object

  const [user, setUser] = React.useState({
    loading: true,
    user: null,
    updated: false,
  });

  const [userid, setUserId] = React.useState(null);

  //updated stores whether user profile info has been changed or not (depends on updated info, api call will be executed again to retrieve new profile info )
  const [updated, setUpdated] = React.useState(false);

  // HomeScreen uses as an indicator to differentiate loggedInUser from guest user.
  const [tokenError, setTokenError] = React.useState(false);

  const getToken = async () => {
    const res = await AsyncStorage.getItem('access_token');

    if (res) {
      try {
        const data = jwt_decode(res); //its for decoding the token string 
        const user_id = data.user_id;
        setUserId(user_id);
        // valid token format
      } catch (error) {
        // invalid token format
        setUserId(null);
        console.log('token error:');
        setTokenError(true);
      }
    } else {
      setUserId(null);
      setTokenError(true);
    }
  };

  const getProfileInfo = async id => {
    console.log('loading...');
    setUser({loading: true, user: null, updated: false});
    await axiosInstance
      .get(`user/${id}/`)
      .then(response => {
        console.log('profile data from  api:', response.data);
        setUser({loading: false, user: response.data, updated: false});
      })
      .catch(error => {
        console.log('something went wrong accessing user profile info:\n');
        setUser({loading: false, user: null, updated: false});
        alert(error.message);
      });
  };

  React.useEffect(() => {
    getToken();
  }, []);

  React.useEffect(() => {
    // console.log('context id:', userid);
    if (userid != null) {
      getProfileInfo(userid);
    } else {
      setUser({loading: false, user: null, updated: true});
    }
  }, [userid]);

  return (
    // We send hooks as value to provider so that they can be accessed through diff screens and components 
    // As long as navigators that contains these screens are encapsulated by provider
    
    <ProfileContext.Provider
      value={{
        userData: [user, setUser],
        userId: [userid, setUserId],
        updatedData: [updated, setUpdated],
        tokenErrorInfo: [tokenError, setTokenError],
      }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
