import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHelmetSafety,
  faHeadset,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import {COLORS, SIZES} from '../../constants/index';
import images from '../../constants/images';

export default function BetterToKnow() {
  const data = [
    {
      title: 'Otoyol Güvenliği',
      icon: faHelmetSafety,
    },
    {
      title: 'Sıkça Sorulan Sorular',
      icon: faMessage,
    },
    {
      title: 'Çağrı Merkezi',
      icon: faHeadset,
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={true}
        renderItem={({item}) => (
          <View
            style={{
              paddingRight: 20,
            }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 90,
                borderRadius: 25,
              }}>
              <ImageBackground
                source={images.weatherBackground}
                resizeMode="cover"
                imageStyle={{
                  width: 105,
                  height: 90,
                  borderRadius: 25,
                  opacity: 0.65,
                }}>
                <View style={{alignItems: 'center'}}>
                  <FontAwesomeIcon
                    style={{top: 10}}
                    icon={item.icon}
                    size={35}
                    color={'white'}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      top: 15,
                      color: 'white',
                      fontWeight: '600',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )}></FlatList>
    </View>
  );
}
