import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS, SIZES} from '../constants/index';
import Icon from 'react-native-vector-icons/AntDesign';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertContainer from '../components/Profile/AlertContainer';
import {ProfileContext} from '../AuthContextProvider/ProfileContext';
import jwt_decode from 'jwt-decode';

export default function OTPScreen(props) {
  let phone = props.route.params.phone;
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [time, setTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState(null);
  const {userId} = React.useContext(ProfileContext);
  const [userid, setUserId] = userId;

  React.useEffect(() => {
    // as soon as phone data is receieved from props, call getPhone()
    //method to update state of loading the screen, so that we would have a phone number to ask for its otp code to
    getPhone();
  }, [phone]);

  const getPhone = () => {
    if (typeof phone != 'undefined') {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const restartControls = async () => {
    setCode(null);
    setValid(false);
    setIsSubmitted(false);
  };

  React.useEffect(() => {
    restartControls();
    getPhone();
  }, [isError]);

  const handleNotifications = otp => {
    console.log('hey its pressed');
    // sends otp code received from getOTPCode() method to user as notif
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids); // ['channel_id_1']
    });
    PushNotification.localNotification({
      channelId: 'test-channel1',
      title: 'KMO OTP Code ',
      message: `Tek Kullanımlık kodunuz ${JSON.stringify(otp)}`,
    });
  };

  //method that access db's verify_otp class to receive an otp code as long as there's an existing account
  //with this phone data
  React.useEffect(() => {
    getOTPCode();
  }, []);

  // as long as a valid code is received from getOTPCode() method,
  //call handleNotifications() to send the code to user with notif
  //later change the method name and its content to send this code info to user as sms
  React.useEffect(() => {
    console.log(code);
    if (code != null) {
      handleNotifications(code);
      // getLoginInfo();
    }
  }, [code]);

  // const getLoginInfo = async () => {
  //   console.log('hey');
  //   await fetch('http://10.0.2.2:8000/api/user/login-info/', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'post',
  //     body: JSON.stringify({phone_number: phone.toString()}),
  //   })
  //     .then(res => res.json())
  //     .then(response => {
  //       setEmail(response.email);
  //       setPassword(response.password);
  //       console.log(response);
  //     })
  //     .catch(err => {
  //       console.log('error server fetch:', err);
  //       setCode(null);
  //     });
  // };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setIsError(false);
    if (token == null) {
      await fetch('http://10.0.2.2:8000/api/token/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({email: email, password: code.toString()}),
      })
        .then(response => response.json())
        .then(res => {
          console.log('red:', res);
          AsyncStorage.setItem('access_token', res.access);
          AsyncStorage.setItem('refresh_token', res.refresh);
          let user_id = jwt_decode(res.access).user_id;
          if (user_id != null && typeof user_id != 'undefined') {
            console.log('id:', user_id);
            setUserId(user_id);
          }
          setIsError(false);
        })
        .catch(error => {
          // 401
          console.log('error is occured');
          setIsError(true);
          console.log('\nerror:', error); //Please Authenticate or whatever returned from server
        });
    }
  };

  const getOTPCode = async () => {
    // this api call returns two of our login credentials:
    //code(now our pwd) and returns email(our username)
    //so what we do is saving these info's to their states
    await fetch('http://10.0.2.2:8000/api/verify-otp/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'patch',
      body: JSON.stringify({phone_number: phone.toString()}),
    })
      .then(res => res.json())
      .then(response => {
        setCode(response.code);
        setEmail(response.email);
        setTimer();

        console.log(response);
      })
      .catch(err => {
        console.log('error server fetch:', err);
        setCode(null);
        isError(true);
      });
  };

  const setTimer = async () => {
    setTime(60 * 5);

    const timerId = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              padding: 10,
              justifyContent: 'center',
              backgroundColor: COLORS.babyblue,
              alignItems: 'center',
            }}>
            <Icon name="left" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>
          Enter 4 Digit Verification Code Sent To Your Number
        </Text>
        <OTPInputView
          style={{
            width: SIZES.width,
            height: 200,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged={code => {
          //   if(code!=null){

          //   }
          // }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            // as soon as user provides an input to all 4 of the input  boxes
            console.log(`Code is ${code}, you are good to go!`);
            // set valid as true
            setValid(true);
          }}
        />
        {time >= 0 ? (
          <TouchableOpacity onPress={() => getOTPCode()}>
            <Text style={styles.resendCode}>
              Resend code in {parseFloat(time / 60).toFixed(2)}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.resendCode}>Resend code now </Text>
        )}
        {!isSubmitted ? (
          <TouchableOpacity
            disabled={!valid}
            onPress={() => {
              // first call handleSubmit method if login credentials are received
              if (email != null && code != null) {
                handleSubmit();
                if (!isError) {
                  // only navigate user to home screen as long as handleSubmit() method has completed its api call to log the user
                  //and the result of this call is positive
                  //I've put this double check bc it takes time to update state values
                  //And i can only understand whether this api call has returned a successfull result by checking isError state
                  props.navigation.push('MainHome', {screen: 'HomeScreen'});
                }
              }
            }}
            style={{
              borderRadius: 10,
              backgroundColor: valid ? 'rgb(21,113,255)' : 'lightgray',
              alignSelf: 'center',
              paddingHorizontal: 20,
              width: SIZES.width - 40,
              padding: 10,
              marginTop: SIZES.height / 6,
            }}>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {isError && isSubmitted && (
          <AlertContainer
            visible={isError}
            text={
              'Girdiğiniz email/password bilgilerine ait hesap bulanamamıştır'
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 55,
    height: 55,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',

    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(21, 133, 225)',
  },

  underlineStyleHighLighted: {
    color: 'rgb(21, 133, 225)',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(21, 133, 225)',
    letterSpacing: 1.5,
    marginTop: SIZES.height / 6,
    textAlign: 'center',
  },
  resendCode: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
