import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import images from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState();
  const [geocoding, setGeocoding] = useState();


  const getWeatherData = async () => {
    try {
      const value = await AsyncStorage.getItem('Weather');
      setWeatherData(JSON.parse(value));
    } catch (e) {
      console.log('weather couldnt be found:', e);
    }
  };
  const getGeocodingData = async () => {
    try {
      const value = await AsyncStorage.getItem('Geocoding');
      //console.log('geo:', JSON.parse(value));
      setGeocoding(JSON.parse(value));
    } catch (e) {
      console.log('geocoding couldnt be found:', e);
    }
  };

  React.useEffect(() => {
    getWeatherData();
    getGeocodingData();
  }, []);

  return (
    <ImageBackground
      source={images.weatherBackground}
      style={styles.backgroundImg}
      imageStyle={{
        borderRadius: 25,
        resizeMode: 'cover',
        alignSelf: 'flex-end',
      }}>
      {weatherData != null ? (
        <View
          style={{
            //backgroundColor: 'rgba(0,0,0,0.3)',
            flex: 1,
          }}>
          {/* Top Info */}
          <View style={styles.topInfo}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* Weather Logo */}
              <View>
                <Image source={{uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}} style={styles.logo} />
                <View>
                  <Text style={styles.weatherTitle}>
                    {weatherData.weather[0].main}
                  </Text>
                </View>
              </View>
              {/* Weather temperature info */}
              <View style={{backgroundColor: 'transparent'}}>
                <Text style={styles.temperatureInfo}>
                  {parseInt(weatherData.main.temp - 273.15)}°
                </Text>
                <Text style={styles.tempDescription}>
                  Feels like {parseInt(weatherData.main.feels_like - 273.15)}°
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                //backgroundColor: 'pink',
              }}>
              {/* Weather description */}
              <View>
                <Text style={styles.tempDescription}>{weatherData.weather[0].description}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: SIZES.width,
    height: SIZES.height / 4,
    padding: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  topInfo: {
    backgroundColor: 'transparent',
  },
  logo: {
    height: 80,
    width: 80,
  },
  temperatureInfo: {
    fontSize: SIZES.double * 4.5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  weatherTitle: {
    fontSize: SIZES.double * 1.8,
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
  },
  tempDescription: {
    color: COLORS.white,
    marginTop: -SIZES.base,
    fontFamily: 'Nunito-Regular',
  },
  bottomInfo: {
    top: SIZES.double,
  },
});
