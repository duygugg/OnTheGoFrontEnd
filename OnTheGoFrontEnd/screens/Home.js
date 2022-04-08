import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {COLORS, SIZES, deviceLanguage, offsetInHours} from '../constants/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../constants/images';
import Slider from '../components/Home/slider';
import Services from '../components/Home/services';
import News from '../components/Home/news';
import {ScrollView} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import {NewsContext} from '../ContextProvider/NewsContext';
import LoaderNoNetwork from '../components/Plates/LoaderNoNetwork';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileContext} from '../AuthContextProvider/ProfileContext';
import AlertContainer from '../components/Profile/AlertContainer';

export default function Home(props) {
  const [weather, setWeather] = useState(null); // all weather related data
  const [news, setNews] = React.useContext(NewsContext);
  const isFocused = useIsFocused(); // whether screen is the focused one
  const {userData, userId, updatedData, tokenErrorInfo} =
    React.useContext(ProfileContext);
  const [user, setUser] = userData; //user object (user profile data including name,last name, email,phone)
  const [userid, setUserId] = userId;
  const [isLoggedin, setIsLogedin] = React.useState(false); //to check whether token is valid meaning user is logged in
  const [updated, setUpdated] = updatedData;
  const [loading, setLoading] = useState(true); //main loader that'll appear when home screen is loaded
  const [tokenError, setTokenError] = tokenErrorInfo;

  useEffect(() => {
    console.log(SIZES.width, SIZES.height);
    getToken();
    getWeatherData(); //it checks both geolocation and weather data and updates the state
  }, [isFocused]);

  useEffect(() => {
    if (weather != null) {
      console.log(weather.weather[0].description);
    }
  }, [weather]);

  const getWeatherData = async () => {
    try {
      const value = await AsyncStorage.getItem('Weather');
      setWeather(JSON.parse(value));
     
    } catch (e) {
      console.log('loc couldnt be found:', e);
    }
  };

  const getToken = async () => {
    await AsyncStorage.getItem('access_token').then(data => {
      // console.log("data",data)
      if (data != null && typeof data == 'string') {
        
        setIsLogedin(true);
        setUserId(jwt_decode(data).user_id);
      } else setIsLogedin(false);
    });
  };

  // setting the main loader of screen
  const ManageLoading = async value => {
    setLoading(value);
  };

  React.useEffect(() => {
    // sets loading true
    ManageLoading(true);
    

    // First checks whether user token is valid (isLoggedIn)
    // Then checks whether user profile info from profile api call is recieved
    //At Last, checks whether news info from news api call is received
    const checkUpdatedLoginInfo = async () => {
      // If ONLY user profile call has ended
      if (!user.loading) {
        // to make the loading false, we need to check whether user profile info is loaded, user is logged in and news data is loaded
        if (user.user != null  && !news.loading) {
          ManageLoading(false);
          // User might be only guest, in this case check if user is not logged in and user profile returned as null(user object=null)
        } else if (user.user == null  && !news.loading) {
          ManageLoading(false);
        }
      } else {
        if (user.user == null  && !news.loading) {
          ManageLoading(false);
        }
      }
    };

    let timerFunc = setTimeout(() => {
      checkUpdatedLoginInfo();
    }, 10000);

    return () => clearTimeout(timerFunc); //clearing timeout when we're done so that we'd cause no memory leakage
  }, [user.loading, isLoggedin, news.loading]);

  React.useEffect(() => {
    // since news data is acquired from backend, in case where api call to backend is not available, open the network error screen
    if (!news.loading && news.newsData == null) {
      props.navigation.navigate('NetworkError');
    }
  }, [news.loading]);

  // Customized weather icon based on acquired weather description
  const getWeatherIcon = name => {
    if (name.includes('açık') || name.includes('clear sky')) {
      return images.sunny;
    } else if (name == 'az bulutlu' || name.includes('few clouds')) {
      return images.fewClouds;
    } else if (
      name == 'kapalı' ||
      name.includes('bulutlu') ||
      name.includes('broken clouds') ||
      name.includes('scattered clouds')
    ) {
      return images.clouds;
    } else if (name.includes('yağmur') || name.includes('rain')) {
      return images.rainy;
    } else if (name.includes('sisli') || name.includes('mist')) {
      return images.windy;
    } else if (name.includes('fırtına') || name.includes('thunderstorm')) {
      return images.thunderstorm;
    } else {
      return images.snowy;
    }
  };

  // Customized welcoming message based on user's timezone
  const getMessage = () => {
    if (offsetInHours < 12) {
      return deviceLanguage == 'tr' ? 'Günaydın' : 'Good Morning';
    } else if (offsetInHours > 12 && offsetInHours < 17) {
      return deviceLanguage == 'tr' ? 'Merhaba' : 'Good Evening';
    } else {
      return deviceLanguage == 'tr' ? 'İyi Akşamlar' : 'Good Night';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {tokenError && (
        // Custom Alert Container Component, check out import section
        <AlertContainer
          visible={tokenError}
          text={'Giriş Yaparken Bir Sıkıntı Oldu. Lütfen Tekrar dene.'}
        />
      )} */}
      {loading ? (
        // Custom Loader Component, check out import section
        <LoaderNoNetwork text={'loading'} />
      ) : (
        <ScrollView style={{flex: 1}}>
          {/* App Header Container  */}
          <View
            style={{
              backgroundColor: COLORS.white,
              paddingBottom: SIZES.double,
              borderBottomWidth: 1.5,
              borderBottomColor: 'lightgray',
              height: 80,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* App Header Row Section (dividing row into two cols respectively for weather info display and profile info display) */}
              <View
                style={{
                  marginTop: SIZES.base,
                  flexDirection: 'row',
                  width: SIZES.width,
                }}>
                {/* COL1 */}
                {/* App Weather Display Section */}

                {/* Weather section will be filled with fellow data and css as long as weather data is received */}
                {weather != null && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: SIZES.width * 0.55,
                      paddingHorizontal: 20,
                      right: 10,
                    }}>
                    {/* Weather  Info Container */}
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      {/* City name  */}
                      <Text
                        style={{
                          textAlign: 'center',
                          fontFamily: 'SourceSansPro-Bold',
                          color: COLORS.neongreen,
                          fontSize: SIZES.width > 400 ? 17 : 12,
                        }}>
                        {weather.name}
                      </Text>
                      {/* weather description e.g. cloudy, misty etc */}
                      <Text
                        style={{
                          fontWeight: '400',
                          color: COLORS.royalblue,
                          width: 70,
                          textAlign: 'center',
                          fontSize: SIZES.width > 400 ? 15 : 12,
                        }}>
                        {/* it's for making the first letter of weather descr string as uppercase */}
                        {weather.weather[0].description
                          .charAt(0)
                          .toUpperCase() +
                          weather.weather[0].description.slice(1)}
                      </Text>
                    </View>
                    {/* Weather degree info */}
                    <Text
                      style={{
                        fontSize: SIZES.width > 400 ? 40 : 33,
                        left: SIZES.width > 400 ? 10 : 10,
                        color: COLORS.black,
                        fontWeight: '600',
                        opacity: 0.55,
                      }}>
                      {/* Weather api returns temperature value in kelvin, we need to convert to celsius */}
                      {parseInt(weather.main.temp - 273.15)}°{' '}
                    </Text>

                    {/* Weather image container */}
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: SIZES.width > 400 ? 50 : 40,
                        height: SIZES.width > 400 ? 50 : 40,
                        left: 10,
                      }}>
                      <Image
                        style={{
                          width: SIZES.width > 400 ? 50 : 40,
                          height: SIZES.width > 400 ? 50 : 40,
                        }}
                        // custom weather image is received from getWeatherIcon(weather_descr) method
                        source={getWeatherIcon(weather.weather[0].description)}
                      />
                    </View>
                  </View>
                )}

                {/* COL2 */}
                {/* Profile Info Container */}
                <View
                  style={{
                    flex: 1,
                    right: 20,
                    flexDirection: 'row',
                  }}>
                  {/* Welcome Text Container */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      right: SIZES.width > 400 ? 60 : 50,
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        fontSize: SIZES.width > 400 ? 14 : 11,
                        fontWeight: '400',
                        color: COLORS.themeblue,
                      }}>
                      {/* Custom welcome text content is retrieved from getMessage() method, e.g- Good morning,good afternoon etc */}
                      {getMessage()}
                    </Text>
                    {/* Adressing the user */}
                    <Text
                      style={{
                        fontSize: SIZES.width > 400 ? 18 : 13,
                        fontWeight: '700',
                        color: COLORS.neongreen,
                        textAlign: 'center',
                      }}>
                      {/* If user profile info is received, display user first name otherwise display 'Welcome' text */}
                      {user.user?.first_name != null
                        ? user.user.first_name.charAt(0).toUpperCase() +
                          user.user.first_name.slice(1)
                        : 'Hoşgeldiniz'}
                    </Text>
                  </View>

                  {/* Vertical Line to divide cols virtually */}
                  <View style={styles.verticleLine}></View>

                  {/* Profile Icon Section */}
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Profile')}
                    style={{
                      borderRadius: 25,
                      width: SIZES.width > 400 ? 40 : 32,
                      height: SIZES.width > 400 ? 40 : 32,
                      backgroundColor: COLORS.royalblue,
                      alignItems: 'center',
                      justifyContent: 'center',
                      right: 0,
                      position: 'absolute',
                      elevation: 2,
                    }}>
                    <Icon
                      // Based on user logged in status, whether api call returns a valid user object,
                      //display lock or profile icon
                      name={user.user == null ? 'lock' : 'user'}
                      size={
                        SIZES.width > 400
                          ? SIZES.double * 1.4
                          : SIZES.double * 0.9
                      }
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* App Slider that displays highway image content */}
          <View
            style={{
              justifyContent: 'center',
              height: SIZES.height / 1.5,
              top: -7.8,
            }}>
            {/* Custom component, check import section if u wish to see the content of the component */}
            <Slider />

            {/* Notif button  */}
            <TouchableOpacity
              // Based on user logged in status, navigate to Login or Notif screen on press
              onPress={() => {
                if (user.user == null && !isLoggedin) {
                  props.navigation.navigate('Login');
                } else {
                  props.navigation.navigate('Notifications');
                }
              }}
              style={{
                borderRadius: 25,
                width: SIZES.width > 400 ? 45 : 35,
                height: SIZES.width > 400 ? 45 : 35,
                backgroundColor: COLORS.neongreen,
                top: 10,
                left: 10,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 10,
              }}>
              <Icon
                name="bell-o"
                size={
                  SIZES.width > 400 ? SIZES.double * 1.8 : SIZES.double * 1.2
                }
                color="white"
              />
              <View
                style={{
                  borderRadius: 25,
                  width: SIZES.width > 400 ? 15 : 10,
                  height: SIZES.width > 400 ? 15 : 10,
                  backgroundColor: COLORS.themeblue,
                  top: 2,
                  left: SIZES.width > 400 ? 36 : 28,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                }}></View>
            </TouchableOpacity>

            {/* GEÇİŞLERİM, İHLALLİ GEÇİŞLERİM, HARİTA CUSTOM COMPONENTS (SERVISLERIM) */}
            {/* Main Container */}
            <View
              style={{
                backgroundColor: COLORS.white,
                height: 130,
                elevation: 2,
                justifyContent: 'center',
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}>
              {/*Adding an extra container to bring the services components out more to create a depth */}
              <View
                style={{
                  marginHorizontal: SIZES.double,
                  borderRadius: 15,
                  top: -10,
                }}>
                {/* Dividing row into 3 equal cols for 3 separate services components */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: SIZES.double,
                    right: 8,
                  }}>
                  {/* Check out Services Component to see how css is used  */}

                  {/* Do not change props unless you change it the way they're being use don component */}
                  <Services
                    icon={'ticket'}
                    color={COLORS.neongreen}
                    routeName={'Passes'}
                    name={'GEÇİŞLERİM'}
                    navigation={props.navigation}
                  />
                  <Services
                    icon="car"
                    routeName={'DebtPasses'}
                    color={'#fd7e14'}
                    name={'İHLALLİ GEÇİŞLERİM'}
                    navigation={props.navigation}
                  />
                  <Services
                    icon="map"
                    routeName={'Harita'}
                    color={COLORS.navyblue}
                    name={'HARİTA'}
                    navigation={props.navigation}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* News Section */}
          <View
            style={{
              marginTop: SIZES.double * 2,
              paddingHorizontal: 20,
            }}>
            <View style={{paddingBottom: 10}}>
              {/* Title */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: '700',
                  left: 18,
                  opacity: 0.75,
                }}>
                Öne Çıkanlar
              </Text>
            </View>
            {/* Custom News Component */}
            <News navigation={props.navigation} />
          </View>

          {/* App Better to Know Section */}
          <View
            style={[
              styles.sectionGeneral,
              {
                marginTop: SIZES.base,
                padding: SIZES.base,
              },
            ]}>
            {/* Section Title */}
            {/* <View style={{justifyContent: 'center', left: 18}}>
              <Text
                style={[
                  styles.introTextStyle,
                  {
                    fontSize: 22,
                    color: COLORS.black,
                  },
                ]}>
                Bilmen Gerekenler
              </Text>
            </View> */}
            {/* App Services component */}
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: SIZES.base,
                flex: 1,
                left: 18,
              }}>
              <BetterToKnow />
            </View> */}
          </View>
          <View style={{height: 20}}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  introTextStyle: {
    fontFamily: 'Nunito-Bold',
    color: '#696969',
    paddingVertical: 10,
  },
  sectionGeneral: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  verticleLine: {
    height: '80%',
    width: 1,
    backgroundColor: 'lightgray',
    left: 10,
  },
});
