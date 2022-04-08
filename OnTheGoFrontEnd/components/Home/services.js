import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'react-native-elements';
import images from '../../constants/images';

export default function Services({name, icon, routeName, navigation, color}) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <View
          style={[
            styles.layoutStyle,
            {backgroundColor: color, borderColor: 'white'},
          ]}>
          <ImageBackground
            source={images.servicesImg1}
            imageStyle={{borderRadius: 20, height: 140, opacity: 0.56}}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* <Icon name={icon} size={SIZES.double * 2} color={'white'} /> */}
            <View
              style={{
                top: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: SIZES.width > 400 ? 16 : 12,
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}
                numberOfLines={3}>
                {name}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  layoutStyle: {
    borderRadius: 20,
    height:150,
    width: 120,
    borderWidth: 3.5,
    left:SIZES.width >400 ? 10:8,
  },
});
