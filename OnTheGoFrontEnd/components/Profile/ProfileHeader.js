import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import images from '../../constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';
import {COLOR, SIZES} from '../../constants/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProfileContext} from '../../AuthContextProvider/ProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileHeader(props) {
  const {userData} = React.useContext(ProfileContext);
  const [user, setUser] = userData;
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    getImageData();
  }, []);

  React.useEffect(() => {
    console.log('image:', image);
  }, [image]);

  const getImageData = async () => {
    try {
      const value = await AsyncStorage.getItem('Profile Photo');
      setImage(JSON.parse(value).assets[0]);
    } catch (e) {
      console.log('image data couldnt be found:', e);
    }
  };

  React.useEffect(() => {}, [user.updated]);
  return (
    <ImageBackground
      source={images.greenBackground}
      style={{
        padding: SIZES.double * 2,
        height: 130,
        flexDirection: 'column',
      }}>
      {/* Back button */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.double,
          top: 20,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => props.navigation.navigate('Home')}>
          <FontAwesomeIcon icon={faArrowLeft} color={'white'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', top: 30}}>
        {/* Title */}
        <View>
          <Text style={{fontSize: SIZES.width > 1200 ? 25 :20, fontWeight: 'bold', color: 'white'}}>
            {user.user?.first_name} {user.user?.last_name}
          </Text>
        </View>
        {/* Profile Image */}
        <View
          style={{
            position: 'absolute',
            right: 0,
          }}>
          <View
            style={{
              height: SIZES.width > 1200 ? 130 : 110,
              width: SIZES.width > 1200 ? 130 : 110,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
              top: -20,
            }}>
            {image != null && typeof image != 'undefined' ? (
              <Image
                resizeMode="cover"
                style={{
                  height: SIZES.width > 1200 ? 100 : 80,
                  width: SIZES.width > 1200 ? 100 : 80,
                  borderRadius: 15,
                }}
                source={{uri: image.uri}}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={{
                  height: SIZES.width > 1200 ? 100 : 80,
                  width: SIZES.width > 1200 ? 100 : 80,
                  borderRadius: 15,
                }}
                source={images.profileImg}
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default ProfileHeader;
