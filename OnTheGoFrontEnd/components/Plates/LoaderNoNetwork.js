import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, SIZES} from '../../constants/index';

export default function LoaderNoNetwork(props) {
  return (
    <View style={styles.container}>
      <LottieView
        source={
          props.text == 'no network'
            ? require('../../assets/animations/90517-connection-error.json')
            : require('../../assets/animations/8428-loader.json')
        }
        autoPlay
        loop
        style={{height: SIZES.height * 0.3, width: SIZES.width}}
      />
      <Text style={{textAlign: 'center'}}>
        {props.text == 'no network' ? 'Couldnt connect to server. Please try again later' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%', width:'100%'
  },
});
