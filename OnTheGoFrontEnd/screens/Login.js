import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import images from '../constants/images';
import axiosInstance from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginLoader from '../components/Login/LoginLoader';
import {useSelector, useDispatch} from 'react-redux';
import {userLoginAPICall} from '../ApiCall/Login';
import AlertContainer from '../components/Profile/AlertContainer';
import {COLORS, SIZES} from '../constants/index';
import PhoneInput from 'react-native-phone-number-input';
import {useIsFocused} from '@react-navigation/native';
import Header from '../components/Header';

export default function Login(props) {
  const [isSelected, setSelection] = useState(false);
  

  // Traditional login hooks that holds email and password credentials, uncomment it if u wish to go back to old login
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // in case of uncorrect login credentials (no account exists with given email and password )

  
  const [isError, setIsError] = useState(false);


  // is Login button is clicked
  const [isSubmitted, setIsSubmitted] = useState(false);

  // phone_number value
  const [value, setValue] = useState('');
  // phone_number+country code
  const [formattedValue, setFormattedValue] = useState('');

  // whether entried phone_number is valid
  const [valid, setValid] = useState(false);

  // hooks to state whether alert message needs to be shown or not
  //in case where user filled a wrong phone_number and clicked submit, we need to display the info message to user
  const [showMessage, setShowMessage] = useState(false);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    console.log('\nmessage:', showMessage);
    // when screen is loaded, do not show alert message
    setShowMessage(false);
  }, [isFocused]);

  const phoneInput = useRef(null);

  // will be called whenever formatted_value changes => change in country code, phone_number or both
  React.useEffect(() => {
    console.log('phone number entered:', formattedValue);
    // check first if current phoneInput value is a valid number or not
    const checkValid = phoneInput.current?.isValidNumber(value);
    // if phone_number is not valid and also state that holds phone_number is not updated yet,
    // show message
    if (formattedValue != '' && checkValid == false) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
    // based on valid state, we allow user to click on button therefore it's an indicator for button activeness
    //valid state depends on whether entered phone_number value has passed from check test
    setValid(checkValid ? checkValid : false);
  }, [formattedValue]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header navigation={props.navigation} />
      <ScrollView>
        <ImageBackground
          source={images.weatherBackground}
          resizeMode={'cover'}
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Cover Image */}
            <View
              style={{
                height: SIZES.height * 0.2,
                width: SIZES.width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.loginImage}
                resizeMode={'cover'}
                style={{height: SIZES.height * 0.3, width: SIZES.width}}
              />
            </View>
            {/* some dummy text info */}
            <View
              style={{
                padding: 10,
                paddingHorizontal: 30,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.title]}>Welcome</Text>
              <Text style={{fontSize: 16, marginTop: 20, textAlign: 'center'}}>
                Please enter your information to login Lorem Ipsum is simply
                dummy text of the printing and typesetting industry.
              </Text>

              {/* phone number field title */}
              <View
                style={{
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                  Phone Number
                </Text>
              </View>
              {/* phone_number field container */}
              <View
                style={{
                  marginTop: 20,
                  paddingBottom: 20,
                  backgroundColor: 'white',
                }}>
                {/* it's a lib that contains country codes which makes selecting and listing country codes practical */}
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value} //initally, it's empty string (we want phone_number field to be empty on first load)
                  defaultCode="TR"
                  layout="second"
                  // ALL the parts below is for styling, the library comes with a very plain css, so i've made some changes to alter it
                  //Refer to doc if u want to make changes
                  textContainerStyle={{
                    borderBottomRightRadius: 15,
                    borderTopRightRadius: 15,
                    paddingRight: 10,
                    borderColor: 'lightblue',
                    borderWidth: 1.5,
                  }}
                  withShadow={false}
                  withDarkTheme={false}
                  textInputStyle={{
                    letterSpacing: 1.5,
                    fontSize: 18,
                    height: 60,
                  }}
                  containerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                    height: 60,
                  }}
                  flagButtonStyle={{
                    borderColor: 'lightblue',
                    borderWidth: 1.5,

                    borderBottomLeftRadius: 15,
                    borderTopLeftRadius: 15,
                  }}
                  // whether user gives entry on phone_number field
                  onChangeText={text => {
                    setValue(text);
                  }}
                  // whether user is done with providing an entry to field
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                />
              </View>
              {/* actually, an error text is shown based on showMessage state value 
              which was prev updated whenever formattedValue changes.
              Naturally, as long as phone_number or country code changes, so does formattedValue

               */}
              {showMessage && (
                <View style={styles.errorMessageContainer}>
                  <Icon name="info-circle" style={styles.errorIcon} size={22} />
                  <Text style={styles.errorMessage}>
                    Girdiğiniz Telefon Numarası Bilgisi Yanlıştır.
                  </Text>
                </View>
              )}
            </View>

            <>
              {/* Uncomment it ONLY IF U WANT TO APPLY TRADITIONAL LOGIN WITH EMAIL AND PWD FILEDS OTHERWISE DO NOT UNCOMMENT IT!! */}

              {/* <View style={{backgroundColor: 'white', marginHorizontal: 20}}>
              <View style={{padding: 10, paddingHorizontal: 30}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 28,
                    color: 'rgb(21, 133, 225)',
                  }}>
                  Welcome
                </Text>
                <Text style={{fontSize: 16,marginTop:20}}>
                  Please enter your information to login
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
              </View>
              <SafeAreaView style={{marginLeft: 70, marginTop: 50}}>
               
                <View>
                  <Text style={{fontSize: 18}}>Email Adress</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: 'rgb(21, 133, 225)',
                    borderBottomWidth: 2,
                    paddingBottom: -3,
                    width: '75%',
                  }}>
                  <TextInput
                    style={{
                      borderRadius: 15,
                      fontSize: 18,
                      paddingHorizontal: 25,
                      backgroundColor: 'transparent',
                      width: '100%',
                    }}
                    placeholder="Email Address"
                    onChangeText={email => setEmail(email)}
                    value={email}
                  />
                  <Icon
                    name="envelope-open"
                    size={16}
                    style={{alignSelf: 'center', justifyContent: 'flex-end'}}
                    color="rgb(21, 133, 225)"
                  />
                </View>
                <View style={{marginTop: 35}}>
                  <Text style={{fontSize: 18}}>Password</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: 'rgb(21, 133, 225)',
                    borderBottomWidth: 2,
                    paddingBottom: -3,
                    width: '75%',
                    marginBottom: 70,
                  }}>
                  <TextInput
                    style={{
                      borderRadius: 15,
                      fontSize: 18,
                      paddingHorizontal: 25,
                      backgroundColor: 'transparent',
                      width: '100%',
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password => setPassword(password)}
                    value={password}
                  />
                  <Icon
                    name="lock"
                    size={16}
                    style={{alignSelf: 'center'}}
                    color="rgb(21, 133, 225)"
                  />
                </View>
              </SafeAreaView>
            </View> */}
              <View
                style={{
                  height: 70,
                  marginTop: 30,
                  marginRight: 20,
                  marginLeft: 20,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 30,
                  padding: 10,
                }}>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    style={{
                      alignSelf: 'center',
                    }}
                    value={isSelected}
                    onValueChange={setSelection}
                  />
                  <Text>Beni Hatırla</Text>
                </View>
                <View></View>
                <View style={{alignItems: 'center', marginRight: 30}}>
                  <Text
                    style={{alignSelf: 'center', right: 0, fontWeight: '600'}}>
                    Şifremi Unuttum
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 40,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
          
                {!isSubmitted ? (

                // NEXT BUTTON THAT NAVIGATES USER TO OTP SCREEN AS LONG AS IT HAS NOT BEEN CLICKED  BEFORE
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: valid ? 'rgb(21,113,255)' : 'lightgray',
                    alignSelf: 'center',
                    paddingHorizontal: 20,
                    width: SIZES.width - 40,
                    padding: 10,
                  }}
                  onPress={() =>
                    props.navigation.navigate('OTPScreen', {
                      phone: formattedValue,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                      Next
                    </Text>
                    <View
                      style={{
                        borderRadius: 50,
                        padding: 10,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon name="chevron-right" color={'white'} size={20} />
                    </View>
                  </View>
                </TouchableOpacity>
                ) : (
                  <LoginLoader navigation={props.navigation} />
                )}
              </View>

              <View
                style={{
                  marginTop: 22,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Sign Up')}
                  style={{alignContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 13, color: 'white', fontWeight: '600'}}>
                    Hesabınız yok mu ? Şimdi Kayıt Olun
                  </Text>
                </TouchableOpacity>
              </View>
            </>
            {isError && (
              <AlertContainer
                visible={isError}
                text={
                  'Girdiğiniz email/password bilgilerine ait hesap bulanamamıştır'
                }
              />
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowStyle: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 0.5},
    textShadowRadius: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 35,
    color: COLORS.themeblue,
    textAlign: 'center',
  },
  errorMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontWeight: '500',
    fontSize: 16,
    left: 10,
  },
  errorIcon: {
    color: 'red',
    justifyContent: 'center',
  },
});
