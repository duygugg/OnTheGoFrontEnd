import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileContext} from '../../AuthContextProvider/ProfileContext';


export default function LogoutButton(props) {
  const [logoutPressed, setLogoutPressed] = useState(false);
  const {userId} = React.useContext(ProfileContext);
  const [userid, setUserId] = userId;
  const logout = async () => {
    const refresh = await AsyncStorage.getItem('refresh_token');

    await axiosInstance
      .post('user/logout/blacklist/', {
        refresh_token: refresh,
      })
      .then(res => {
        AsyncStorage.removeItem('access_token');
        AsyncStorage.removeItem('refresh_token');
        AsyncStorage.removeItem('user');
        console.log('user info:\n',res);
        axiosInstance.defaults.headers['Authorization'] = null;
        setUserId(null)
        props.navigation.push('MainHome',{screen:'HomeScreen'});
      })
      .catch(error => {
        console.log('smth happened:', error.response);
      });
  };
  useEffect(() => {
    // whenever logout btn pressed, logOutPressed state would be true therefore logOut() method will be called
    // to make api call to log user out and reset the acccess/refresh tpkens
    if (logoutPressed) {
      logout();
    }
  });

  return (
    <View
      style={{
        marginTop: 40,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        {/* On click sets logOutPressed state as true */}
      <TouchableOpacity
        style={{
          borderRadius: 10,
          backgroundColor: 'red',
          alignSelf: 'center',
          paddingHorizontal: 80,
          padding: 15,
        }}
        onPress={() => setLogoutPressed(true)}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
          Çıkış Yap
        </Text>
      </TouchableOpacity>
    </View>
  );
}
