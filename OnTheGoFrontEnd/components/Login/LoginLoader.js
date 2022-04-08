import {View, Text} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export default class LoginLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loading: true,
    };
  }
  async componentDidMount() {
    //this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play();
    try {
      const user = await AsyncStorage.getItem('access_token');
      //console.log('token:', user);
      console.log('user info:', jwt_decode(user));

      this.setState({token: jwt_decode(user)});

      //console.log('hello,', this.state.token.user_id);
      //console.log('Date expire:', new Date(this.state.token.exp * 1000));
      fetch(`http://10.0.2.2:8000/api/user/${this.state.token.user_id}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(data => {
          //console.log('data cmes:', data);
          this.animation.pause();
          AsyncStorage.setItem('user', JSON.stringify(data));
          this. props.navigation.push('HomeScreenAuth');
        })
        .catch(error => console.log('\n\nerror home:', error));
    } catch (err) {
      console.log('error async:', err);
    }
  }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 70,
        }}>
        <LottieView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            left: 40,
          }}
          ref={animation => {
            this.animation = animation;
          }}
          width={250}
          height={100}
          source={require('../../assets/animations/78126-secure-login.json')}
        />
      </View>
    );
  }
}
