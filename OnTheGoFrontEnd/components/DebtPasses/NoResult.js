import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {COLORS, SIZES} from '../../constants/index';
import LottieView from 'lottie-react-native';

export default function NoResult(props) {
  return (
    <View style={{justifyContent: 'center', height: SIZES.height}}>
      <View
        style={{
          marginTop: SIZES.height / 20,
          height: SIZES.height * 0.4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../../assets/animations/89809-no-result-green-theme.json')}
          autoPlay
          loop
          style={{height: SIZES.height * 0.35, width: SIZES.width * 0.35}}
        />
      </View>
      <View
        style={{
          paddingBottom: SIZES.height / 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderColor: COLORS.themegreen,
            borderWidth: 2,
            alignItems: 'center',
            borderRadius: 15,
            width: SIZES.width / 1.2,
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', textAlign: 'center'}}>
            {props.text}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // props.setResults({data: null, text: null});

            props.navigation.navigate('DebtPasses');
          }}
          style={{
            borderRadius: 15,
            paddingHorizontal: 15,
            padding: 15,
            backgroundColor: 'rgba(74, 220, 106, 1)',
            paddingHorizontal: 20,
            marginTop: SIZES.height / 12,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.height * 0.025,
              fontWeight: 'bold',
            }}>
            Yeniden Sorgulama Yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // props.setResults({data: null, text: null});

            props.navigation.navigate('Home');
          }}
          style={{
            borderRadius: 15,
            paddingHorizontal: 15,
            padding: 15,
            backgroundColor: 'rgba(74, 220, 106, 1)',
            paddingHorizontal: 20,
            marginTop: SIZES.height / 12,
          }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.height * 0.025,
              fontWeight: 'bold',
            }}>
            Anasayfaya Geri Dön
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


