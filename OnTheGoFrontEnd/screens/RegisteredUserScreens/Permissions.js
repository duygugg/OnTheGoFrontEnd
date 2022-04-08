import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import {COLORS, SIZES} from '../../constants/index';
import images from '../../constants/images';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import SwitchButton from '../../components/Profile/SwitchButton';
import {PermissionContext} from '../../AuthContextProvider/PermissionsContext';
import {useIsFocused} from '@react-navigation/native';
import LoaderNoNetwork from '../../components/Plates/LoaderNoNetwork';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Permissions(props) {
  const [isEnabledSMS, setIsEnabledSMS] = useState(null);
  const [isEnabledEmail, setIsEnabledEmail] = useState(null);
  const isFocused = useIsFocused();
  const [loading,setLoading]=useState(true);

  const getData = async permission_type => {
    try {
      const jsonValue = await AsyncStorage.getItem(permission_type);
      console.log(permission_type, ':', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const toggleSMS = async () => {
    const smsState = await getData('SMSPermission');
    console.log(smsState);

    if (typeof smsState != 'undefined') {
      console.log('sms ', smsState);
      if (smsState == null) {
        setIsEnabledSMS(false);
      } else {
        setIsEnabledSMS(smsState);
      }
    } else {
      console.log('sms errro', smsState);
    }
  };
  const toggleEmail = async () => {
    const emailState = await getData('EmailPermission');
    if (typeof emailState != 'undefined') {
      if (emailState == null) {
        setIsEnabledEmail(false);
      } else {
        setIsEnabledEmail(emailState);
      }
    }
  };

  useEffect(() => {
    console.log('\n\nfocused');

    toggleEmail();
    toggleSMS();
  }, [isFocused]);

  useEffect(() => {
    console.log("smth changed sms",isEnabledEmail);
    const update=() => {
      setLoading(true)
    console.log('semail:', isEnabledEmail);
    setTimeout(()=>setLoading(false),4000)
    }
    update();
  }, [isEnabledEmail]);


  useEffect(() => {
    console.log("smth changed",isEnabledEmail);
   const update=async () => {
    setLoading(true)
    console.log('smsa :', isEnabledSMS);
    setTimeout(()=>setLoading(false),4000)
   }
   update();
  }, [isEnabledSMS]);

  if (isEnabledEmail == null && isEnabledSMS == null &&loading) {
    return <LoaderNoNetwork text={'loading'} />;
  }
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.content}>
        <SwitchButton
          text={'SMS'}
          isEnabledSMS={isEnabledSMS} setIsEnabledSMS={setIsEnabledSMS}
          isEnabledEmail={isEnabledEmail} setIsEnabledEmail={setIsEnabledEmail}
        />

        <Text>
          İhlalli Geçişlerim ve ödemesi yaklaşmış geçişlerim ile ilgili bildirim
          almak istiyorum
        </Text>

        <SwitchButton
          text={'Email'}
          isEnabledSMS={isEnabledSMS} setIsEnabledSMS={setIsEnabledSMS}
          isEnabledEmail={isEnabledEmail} setIsEnabledEmail={setIsEnabledEmail}
        />

        <Text>
          İhlalli geçiş ve geçişlerim ile ilgili gün sonu özetler almak
          istiyorum
        </Text>
      </View>

      <View style={{alignSelf: 'center', bottom: 20, position: 'absolute'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('MyProfileScreen');
          }}>
          <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
            Onayla
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    marginTop: 15,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: COLORS.neongreen,
    paddingHorizontal: 50,
    padding: 10,
    borderRadius: 15,
  },
});
