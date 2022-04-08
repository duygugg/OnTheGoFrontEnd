import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import images from '../../constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import ProfileInfoSection from '../../components/Profile/ProfileInfoSection';
import {ProfileContext} from '../../AuthContextProvider/ProfileContext';
import LoaderNoNetwork from '../../components/Plates/LoaderNoNetwork';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage/';

export default function ProfileInfo(props) {
  const [loading, setLoading] = React.useState(false);
  const error = props.route.params?.error;
  const {userData, userId, updatedData} = React.useContext(ProfileContext);
  const [user, setUser] = userData;
  const [changeImage, setChangeImage] = React.useState(false);
  const [image, setImage] = React.useState(null);

  // React.useEffect(() => {
    
  //   let timer = setTimeout(() => {
  //    getImageData()
  //   }, 1000);

  //   if (image == null) {
  //     savePhotoToStorage(images.profileImg);
  //   }
  //   return clearTimeout(timer);
  // }, []);

  // React.useEffect(() => {
  //   console.log('imag', image);
  // }, [image]);

  // React.useEffect(() => {
  //   if (!changeImage) {
  //     console.log('image:', image);
  //   }
  // }, [changeImage]);

  // removing stored user profile image data from storage
  //use it to dleete old profile pic data when user uploads new one 
  const removeImage = async () => {
    try {
      await AsyncStorage.removeItem('Profile Photo');
    } catch (e) {
      console.log('image data couldnt be removed:', e);
    }
  };
// getting profile image data
  const getImageData = async () => {
    console.log('hey img');
    try {
      const value = await AsyncStorage.getItem('Profile Photo');
      setImage(JSON.parse(value));
    } catch (e) {
      console.log('image data couldnt be found:', e);
      savePhotoToStorage(images.profileImg);
    }
  };

  // to open camera of user's device
  const takePhotoFromCamera = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, res => {
      console.log('res\n', res);
      savePhotoToStorage(res.assets[0].uri);
    });
  };

  // saving retrieevd image data from user to storage
  const savePhotoToStorage = async res => {
    console.log('hey');
    try {
      const jsonValue = JSON.stringify(res);
      await AsyncStorage.setItem('Profile Photo', jsonValue);
      // setImage(JSON.parse(jsonValue));
    } catch (e) {
      console.log('photo storage error:', e);
    }
  };
// opening user's device library 
  const selectPhotoFromLibrary = async () => {
    await launchImageLibrary({mediaType: 'photo', quality: 1}, res => {
      console.log('res\n', res);
      savePhotoToStorage(res.assets[0].uri);
    });
  };

  // compoent that shows as modal that offers user take photo from library or camera options as buttons
  const ChangeImageComponent = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={changeImage}>
        {/* outlay */}
        <TouchableWithoutFeedback onPress={() => setChangeImage(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              {/* container of modal */}
              <View style={styles.modalContainer}>
                <View style={{position: 'absolute', top: 20, left: 30}}>
                  {/* its title */}
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    Profil Fotoğrafı Değiştir
                  </Text>
                  {/* its description */}
                  <Text
                    style={{
                      top: 10,
                      fontSize: 15,
                      fontWeight: '300',
                      color: COLORS.black,
                    }}>
                    Profil Fotoğrafını Değiştirmek için Kamera veya
                    Kütüphanenden Fotoğraf Seçimini Yapabilirsin.
                  </Text>
                </View>
                {/* Kamera access button */}
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: COLORS.neongreen,
                    alignSelf: 'center',
                    paddingHorizontal: 90,
                    padding: 15,
                    marginTop: 30,
                  }}
                  onPress={() => {
                    // removeImage();
                    // takePhotoFromCamera();
                  }}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    Kamera ile Çek
                  </Text>
                </TouchableOpacity>
                {/* Kütüphane access button */}
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: COLORS.neongreen,
                    alignSelf: 'center',
                    paddingHorizontal: 75,
                    padding: 15,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    // removeImage();
                    // selectPhotoFromLibrary();
                  }}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    Kütüphaneden Seç
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  React.useEffect(() => {
    console.log('err:', error);
  }, [error]);

  const Header = () => {
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
          source={images.greenBackground}
          style={styles.backgroundImage}
        />
        {/* Back button */}
        <View style={{position: 'absolute', left: SIZES.double}}>
          <TouchableOpacity
            style={[{flexDirection: 'row'}]}
            onPress={() => props.navigation.goBack()}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={25}
              color={'white'}
              style={styles.textShadow}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {fontSize: 20, fontWeight: 'bold', color: 'white'},
              styles.textShadow,
            ]}>
            Profil Bilgilerim
          </Text>
        </View>
      </SafeAreaView>
    );
  };

  const ProfileContainer = () => {
    return (
      <>
      <ScrollView keyboardShouldPersistTaps="always"keyboardDismissMode="on-drag">
        {/* Header */}
        <Header navigation={props.navigation} />

        {/* Profile container */}
        <View style={styles.profileContainer}>
        
          {/* Profile photo section */}
          <View style={[styles.profileImgContainer]}>
            {/* Profile photo */}
            <View style={styles.imageContainerStyle}>
              {/* displaying a default profile icon till user's profile photo is being received or when user has no profile photo */}
            {image != null && typeof image != 'undefined' ? (
              <Image
                resizeMode="cover"
                style={styles.imageStyle}
                source={{uri: image.uri}}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={styles.imageStyle}
                source={images.profileImg}
              />
            )}
            </View>
            {/* Upload Photo */}
            <TouchableOpacity
              onPress={() => setChangeImage(true)}
              style={styles.imgEditContainerStyle}>
              <FontAwesomeIcon icon={faEdit} size={20} color={'white'} />
            </TouchableOpacity>
          </View>
          {/* {changeImage && <ChangeImageComponent />} */}
          
            {/* Profile Info Section *Hesap Bilgilerim*/}
            <ProfileInfoSection navigation={props.navigation} />
            
      
        </View>
        </ScrollView>
      </>
    );
  };

  if (user.user?.first_name == null) {
    <LoaderNoNetwork text={'loading'} />;
  }

  return (
    <View style={styles.container}>
      {/* {image == null ? (
        <LoaderNoNetwork text={'loading'} />
      ) : ( */}
        <ProfileContainer />
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    flex: 1,
  },
  profileImgContainer: {
    backgroundColor: COLORS.white,
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageContainerStyle: {
    height: 120,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 75,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 75,
  },
  imgEditContainerStyle: {
    borderRadius: 50,
    backgroundColor: COLORS.neongreen,
    height: 40,
    width: 40,
    position: 'absolute',
    right: 0,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 1,
    width: SIZES.width,
    height: 170,
    opacity: 1,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 0.5},
    textShadowRadius: 20,
  },
  modalContainer: {
    height: SIZES.width / 1.2,
    width: SIZES.width / 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
