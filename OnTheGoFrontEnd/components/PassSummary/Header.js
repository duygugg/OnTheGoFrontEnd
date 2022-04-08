import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../constants/index';
import images from '../../constants/images';

export default function Header(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'transparent',
        padding: SIZES.double * 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        resizeMode="cover"
        source={images.weatherBackground}
        style={styles.backgroundImage}
      />
      {/* Back button */}
      <View style={{position: 'absolute', left: SIZES.double}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => props.navigation.goBack()}>
          <Icon name="left" size={25} color={'white'} />
          {/* <Text style={{fontSize:18}}>Back</Text> */}
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Geçişlerim
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 1,
    width: SIZES.width,
    height: 170,
    opacity:0.7
  },
});
