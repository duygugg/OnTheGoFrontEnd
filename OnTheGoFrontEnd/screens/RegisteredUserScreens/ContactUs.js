import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {COLORS, SIZES} from '../../constants/index';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import ContactContainer from '../../components/Profile/ContactUs/ContactContainer';

export default function ContactUs(props) {
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {/* Contact Us Containers  */}
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}} />
      {/* KMO CALL CENTER */}
      <ContactContainer
        text={'phone'}
        title={'ALO 161'}
        context={'Acil Yol Yardımını Ara '}
        phone={'161'}
      />
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}} />
      <ContactContainer
        text={'phoneCallCenter'}
        title={'Müşteri Hizmetleri'}
        context={'Müşteri Hizmetlerini Ara'}
        phone={'08502590061'}
      />
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}} />
      {/* KMO EMAIL INFO*/}
      <ContactContainer
        text={'email'}
        title={'Bize Ulaş'}
        context={'bilgi@kuzeymarmaraotoyolu.com'}
        phone={'None'}
      />
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}} />
      {/* KMO Location INFO*/}
      <ContactContainer
        text={'location'}
        title={'Neredeyiz'}
        context={'Garipçe Mahallesi Rumeli Feneri Caddesi No:280 34450'}
        phone={'None'}
      />
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1}} />
      {/* Social media icon container */}
      <View style={{padding: 15}}>
        <Text style={styles.socialText}>
          Sosyal Medya Hesaplarımızı Takip Etmek İstersin Diye
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.socialContainer}>
            {/* instagram*/}
            <FontAwesomeIcon
              icon={faInstagram}
              color={COLORS.white}
              size={30}
            />
          </View>
          {/* twitter */}
          <View style={styles.socialContainer}>
            <FontAwesomeIcon icon={faTwitter} color={COLORS.white} size={30} />
          </View>
          {/* facebook */}
          <View style={styles.socialContainer}>
            <FontAwesomeIcon icon={faFacebook} color={COLORS.white} size={30} />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  socialText: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  socialContainer: {
    top: 20,
    borderRadius: 12,
    padding: 15,
    backgroundColor: COLORS.themeblue,
    alignItems: 'center',
  },
});
