import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Platform, Easing} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PushNotification from 'react-native-push-notification';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import News from './screens/News';
import NewsDetailProvider from './ContextProvider/NewsDetailContext';
import NewsProvider from './ContextProvider/NewsContext';
import DebtPassProvider from './ContextProvider/DebtPassContext';
import DebtPasses from './screens/DebtPasses';
import DebtPassInquiryResults from './screens/DebtPassInquiryResults';
import Intro from './screens/Intro';
import PassItemProvider from './ContextProvider/PassItemContext';
// import SplashScreen from './screens/SplashScreen';
import FirstTimeContexProvider from './ContextProvider/FirstTimeScreen';
import NetworkErrorScreen from './screens/NetworkErrorScreen';
import NetInfo from '@react-native-community/netinfo';
import ProfileContextProvider from './AuthContextProvider/ProfileContext';
import {useSelector, useDispatch} from 'react-redux';
import {deviceLanguage} from './constants/index';
import reduxStore from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import PaymentPreviewScreen from './screens/RegisteredUserScreens/PaymentPreviewScreen';
import OTPScreen from './screens/OTPScreen';

//ignoring the warning that contains...
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

export default function App() {
  const {store, persistor} = reduxStore(); //redux store for persist-redux structure

  const [user, setUser] = useState({loading: true, user: null});
  const [showSplash, setShowSplash] = useState(true);
  const [IsFirstLaunch, setIsFirstLaunch] = useState(false);

  const [showOneTimeScreen, setShowOneTimeScreen] = useState(true);
  const [loading, setLoading] = useState(true);
  // AsyncStorage.clear()

  async function locationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        //you can specify the location permission container content by uncommenting the below comments if u wish
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // {
        //   title: 'KMO is asking for your location permission ',
        //   message: 'You can choose to share your location for us to inform you on dangerous'
        //     + 'activities within your location and our motorway ',
        //   buttonNeutral: "Ask Me Later",
        //   buttonNegative: "Cancel",
        //   buttonPositive: "OK",
        // }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //if user choice of permission (granted) is equals to positive result of granted
        console.log('ok');
        Geolocation.getCurrentPosition(
          //get coords from geolocation method and set it to async using storeLocationData() method
          position => {
            console.log('working');
            storeLocationData({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            fetchWeatherBasedOnLoc(); //calling this method to get weather info since we've already stored the coords info in prev steps
          },
          error => {
            console.log('error has been occured ' + error.message); //in case of problem occured during accessing coords
            alert('error abt geolocation');
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        //in case where user declines giving its permission to access its location
        console.log('loc permission denied');

        alert('loc permission denied');
      }
    } catch (err) {
      //in case where permission request couldnt have sent to user in first place
      console.warn('some error is occurred: ' + err);
    }
  }

  const storeLocationData = async value => {
    //stringfies the parameter since async storage only accepts values to be stored as non other than string
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Location', jsonValue); //calls this value as Location
    } catch (e) {
      console.log('storage error:', e);
    }
  };

  const getLocationData = async () => {
    //checks whether a value exists by given name of Location, if that's so returns the parsed value(string->object)
    try {
      const value = await AsyncStorage.getItem('Location');
      // console.log('json:', JSON.parse(value));
      return JSON.parse(value);
    } catch (e) {
      // error reading value
    }
  };

  const storeWeatherData = async value => {
    //stringfies the parameter since async storage only accepts values to be stored as non other than string
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Weather', jsonValue); //calls this value as Weather so that it can access it later by referring it as this name
    } catch (e) {
      console.log('storage error:', e);
    }
  };

  const storeGeocodingData = async value => {
    //stringfies the parameter since async storage only accepts values to be stored as non other than string
    try {
      const jsonValue = JSON.stringify(value);
      // console.log('Geocoding:', jsonValue);
      await AsyncStorage.setItem('Geocoding', jsonValue); //it's for storing the city name data of user
    } catch (e) {
      console.log('storage error:', e);
    }
  };

  async function fetchWeatherBasedOnLoc() {
    //func that we call as soon as we acquire the coords data from granted user permission
    var item = null; //primary value of coords
    try {
      item = await getLocationData(); //in order to access the coord data, we need to access it from storage, thus we make a call to getLocationData() method to do so
      // console.log('item:', item);
    } catch (e) {
      console.log('Error getting item', e);
    }

    if (item != null) {
      //if coords (loc) data is found in storage, then item will be no longer null, then we'll extract long and lat from that data(item)
      console.log('lat and long:', item.latitude);
      const latitude = item.latitude;
      const longitude = item.longitude;

      const weatherApiKey = '935cc2f39cb1cca84b5450c5b43df94b'; //is unlimited but i highly advise maintainer to change and open a new account on weatherapi website

      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'935cc2f39cb1cca84b5450c5b43df94b'}&lang=${deviceLanguage}`;
      //we pass long, lat values, api key and lang. lang is coming from deviceLanguage variable which is setted as user device lang
      try {
        const response = await fetch(weatherApiUrl); //we make call to weatherApiUrl endpoint
        if (response.status === 200) {
          //as long as response from data is valid, we call storeWeatherData method
          //so that we can store the weather data into storage
          const data = await response.json();
          storeWeatherData(data);
        } else {
          console.log('not ok');
        }
      } catch (error) {
        console.log('error occured:', error);
      }
    } else {
      storeWeatherData(item);
      //in case of loc (coords) data has not been acquired from storage(thus does not exist),
      //we still call storeWeatherData method to store the weather data value as null
      //bc at the end, we need an indicator of whether all this processes have been completed or not
    }
  }

  const fetchCityName = async () => {
    var item = null;
    try {
      item = await getLocationData();
    } catch (e) {
      console.log('Error getting item', e);
    }

    if (item != null) {
      const latitude = item.latitude;
      const longitude = item.longitude;
      const key = 'AIzaSyALfRSmPE4Ocl4J_ItRydtOutd315BZ6SM';
      console.log('kdlsssi:', item);

      console.log('current:', location.latitude, ' and ');
      const googleApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
      try {
        const response = await fetch(googleApiUrl);
        console.log('sjsjjs:', data);
        if (response.status === 200) {
          const data = await response.json();

          storeGeocodingData(data);
          console.log('google ok fetch by city', data);
        } else {
          console.log('smth went wrong');
        }
      } catch (error) {
        console.log('error reason:', error);
      }
    }
  };

  //creating push notif channel for testing purposes also, this channel is being used to send otp code to user device as push notif
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel1',
      channelName: 'Test Channel',
      vibrate: true,
      importance: 4,
    });
  };

  //initially used to check if user is logged in so that we can stop showing splash by then
  //also we can save time checking user logged in status on home page since it'd only consume time when checking it from storage
  const getToken = async () => {
    const res = await AsyncStorage.getItem('access_token');
    console.log('access_token:', res);
    if (res) {
      setTimeout(() => {
        setShowSplash(false);
      }, 5000);

      setUser({loading: false, user: res});
    } else {
    }
  };

  const updateFirstTime = async () => {
    const res = await AsyncStorage.getItem('access_token');
    if (res) {
      setIsFirstLaunch(!IsFirstLaunch);
    }
  };

  //checking internet connection
  const unsubscribe = NetInfo.addEventListener(state => {
    // console.log('Connection type', state.type);
    if (state.isConnected) {
      // console.log(
      //   'details',
      //   state.details.ipAddress,
      //   ' and ',
      //   state.details.subnet,
      // );
    }
  });

  // console.log(IsFirstLaunch, showSplash);

  React.useEffect(() => {
    locationPermission();
    createChannels();
    getToken();
    unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* redux provider that refers to store  */}
      <Provider store={store}>
        {/* perist gate for redux-persist  */}
        <PersistGate loading={null} persistor={persistor}>
          {/* All news, newsDetail, passes, firstTimeLaunch are common hooks that are being used by both guest and auth user   */}
          <NewsProvider>
            <ProfileContextProvider>
              <NewsDetailProvider>
                <DebtPassProvider>
                  <PassItemProvider>
                    <FirstTimeContexProvider>
                      {/* App navigation */}
                      <NavigationContainer>
                        <Stack.Navigator
                          tabBarOptions={{
                            keyboardHidesTabBar: true,
                          }}>
                            {/* MainHome refers bottomtabsnavigator which its initial screen refers to HomeScreen.js */}
                          <Stack.Screen
                            name="MainHome"
                            options={{
                              headerShown: false,
                              keyboardHidesTabBar: true,
                            }}
                            component={BottomTabsNavigator}
                          />

                          <Stack.Screen
                            name="NewsScreen"
                            options={{headerShown: false}}
                            component={News}
                          />
                          <Stack.Screen
                            name="PaymentPreviewScreen"
                            options={{headerShown: false}}
                            component={PaymentPreviewScreen}
                          />
                          <Stack.Screen
                            name="DebtPasses"
                            options={{headerShown: false}}
                            component={DebtPasses}
                          />
                          <Stack.Screen
                            name="DebtPassResults"
                            options={{headerShown: false}}
                            component={DebtPassInquiryResults}></Stack.Screen>
                          <Stack.Screen
                            name="NetworkError"
                            options={{headerShown: false}}
                            component={NetworkErrorScreen}
                          />
                          <Stack.Screen
                            name="OTPScreen"
                            options={{headerShown: false}}
                            component={OTPScreen}
                          />
                        </Stack.Navigator>
                      </NavigationContainer>
                    </FirstTimeContexProvider>
                  </PassItemProvider>
                </DebtPassProvider>
                {/* </NotificationProvider> */}
              </NewsDetailProvider>
            </ProfileContextProvider>
          </NewsProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
