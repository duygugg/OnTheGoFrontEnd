import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../constants/index';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPhone,
  faEnvelopeOpen,
  faThumbtack,
  faAngleRight,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
export default function ContactContainer({text, title, context, phone}) {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${41.20354115118351},${29.051592127292224}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const openMaps = () => {
    return Linking.openURL(url);
  };

  const callNumber = () => {
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };
  const openEmail = () => {
    Linking.canOpenURL(`mailto:${context}`)
      .then(supported => {
        if (!supported) {
          Alert.alert('Email is not available');
        } else {
          return Linking.openURL(`mailto:${context}`);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <TouchableOpacity
      style={styles.contactUsStyle}
      onPress={() => {
        if (text == 'phone' || text == 'phoneCallCenter') {
          callNumber();
        } else if (text == 'email') {
          openEmail();
        }else if (text=='location'){
          openMaps()
          
        }
      }}>
      <View
        style={[
          styles.textIcon,
          {
            borderRadius: 50,
            backgroundColor: COLORS.neongreen,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        <FontAwesomeIcon
          icon={
            text == 'phone'
              ? faPhone
              : text == 'email'
              ? faEnvelopeOpen
              : text == 'location'
              ? faThumbtack
              : faPhoneVolume
          }
          color={COLORS.white}
        />
      </View>

      {/* Text */}
      <View style={styles.textIcon}>
        <Text style={styles.textStyle}>{title} </Text>
        <Text style={{width: SIZES.width * 0.55}}>{context}</Text>
        {text == 'location' && (
          <Text style={{top: 10}}>SARIYER / İSTANBUL</Text>
        )}
      </View>
      <View style={styles.textIcon}>
        <FontAwesomeIcon icon={faAngleRight} size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  contactUsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
