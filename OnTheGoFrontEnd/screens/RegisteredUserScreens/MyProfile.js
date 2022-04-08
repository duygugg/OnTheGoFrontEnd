import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Account from '../../components/Profile/Account';
import {
  faUser,
  faPhoneAlt,
  faLock,
  faClipboardCheck,
  faCommentDots,
  faChartBar,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import LoaderNoNetwork from '../../components/Plates/LoaderNoNetwork';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyProfile(props) {
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    getImageData();
  }, []);

  // getting user profile image in asycn storage if it exists
  const getImageData = async () => {
    try {
      const value = await AsyncStorage.getItem('Profile Photo');
      setImage(JSON.parse(value).assets[0]);
    } catch (e) {
      console.log('image data couldnt be found:', e);
    }
  };

  // if (image == null) {
  //   return <LoaderNoNetwork text={'loading'} />;
  // }

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Back button */}

        <ProfileHeader image={image} navigation={props.navigation} />
        {/*  title of list */}
        <View style={{padding: 20}}>
          <Text
            style={{left: 20, fontSize: 20, fontWeight: 'bold', opacity: 0.65}}>
            Hesabım
          </Text>
        </View>
        <Account
          icon={faUser}
          title={'Bilgilerim'}
          navigation={props.navigation}
          text={'EditProfile'}
          image={image}
        />
        <Account
          icon={faClipboardCheck}
          title={'İzinlerim'}
          navigation={props.navigation}
          text={'Permissions'}
        />
        <Account
          icon={faChartBar}
          title={'Geçiş Özet Ayarlarım'}
          navigation={props.navigation}
          text={'Permissions'}
        />

        {/* <Account icon={faBookAtlas} title={'Son Giriş Bilgilerim'} /> */}
        {/* divider */}
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
        {/* title of new list section */}
        <View style={{padding: 20}}>
          <Text
            style={{left: 20, fontSize: 20, fontWeight: 'bold', opacity: 0.65}}>
            Yardım
          </Text>
        </View>
        <Account
          icon={faCommentDots}
          title={'Sıkca Sorulan Sorular'}
          navigation={props.navigation}
          text={'Sıkça Sorulan Sorular'}
        />
        <Account
          icon={faPhoneAlt}
          title={'Bize Ulaşın'}
          navigation={props.navigation}
          text={'Bize Ulaşın'}
        />
        {/* divider */}
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
        {/* title of new list section */}

        <View style={{padding: 20}}>
          <Text
            style={{left: 20, fontSize: 20, fontWeight: 'bold', opacity: 0.65}}>
            Diğer
          </Text>
        </View>
        <Account
          icon={faUser}
          title={'Dil Ayarları'}
          navigation={props.navigation}
          text={'EditProfile'}
        />
        <Account
          icon={faArrowRightToBracket}
          title={'Çıkış Yap'}
          navigation={props.navigation}
          text={'Logout'}
        />
{/* divider */}
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
