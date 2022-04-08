import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../axios';
import images from '../constants/images';
import RegisterForm from '../components/Registration/RegisterForm';
import TCKNForm from '../components/Registration/TCKNForm';
import {COLORS, SIZES} from '../constants/index';
import {useIsFocused} from '@react-navigation/native';
import {RegisterFormContext} from '../AuthContextProvider/RegisterFormContext';
import Header from '../components/Header';

export default function Registration(props) {
  // Register form field hooks
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // is form filled, clicked next button and clicked submit form button infos are retrieved from context api
  //the reason why is, we have two step forms which are shown in two different components and they need to share these hooks to perform some operations
  //context api is preferred in the first place to enable state managing and sharing between screens
  const {formData, clickedData, registerBtnData} =
    useContext(RegisterFormContext);

  const [formFilled, IsformFilled] = formData;
  const [clickedNext, setClickedNext] = clickedData;
  const [registerBtnClicked, setRegisterBtnClicked] = registerBtnData;

  const isFocused = useIsFocused();

  React.useEffect(() => {
    // start controls, each time this screen is opened,
    //we reset form filled and form clicked next button state values
    console.log(isFocused);
    setClickedNext(false);
    IsformFilled(false);

    console.log('form filled? ', formFilled);
  }, [isFocused]);

  // needs to be called after nfc implementation takes place,
  const handleSubmit = () => {
    axiosInstance
      .post(`user/register/`, {
        email: email,
        first_name: name,
        last_name: surname,
        phone_number: phone,
        password: password,
      })
      .then(res => {
        props.navigation.navigate('Login');
        // console.log(res);
        // console.log(res.data);
      })
      .catch(error => {
        // 401
        console.log('\nerror:', error.response.data); //Please Authenticate or whatever returned from server
      });
  };

  // Button background color that depends on whether buttons are clicked
  const getBackground = () => {
    if (clickedNext == false) {
      if (formFilled) {
        return 'rgb(21,113,255)';
      }
      return 'lightgray';
    } else {
      if (registerBtnClicked) {
        return 'rgb(21,113,255)';
      }
      return 'lightgray';
    }
  };

  return (
    <View
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
            <>
              {/* If user has clicked the next button, clickedNext state is updated */}
              {/* if clickedNext == true, then load the TCKNValidateForm component, otherwise, registrationForm component is displayed */}
              {clickedNext ? (
                <TCKNForm navigation={props.navigation} />
              ) : (
                <RegisterForm />
              )}
              <View style={{backgroundColor: 'transparent', padding: 20}}>
                {/* Pagination dots For Two-Step Form shows which screen that's displayyed(if it's first step form or seconnd step form) */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      paddingHorizontal: 30,
                      backgroundColor: 'rgba(238, 238, 238,0.7)',
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        backgroundColor:
                          clickedNext == false ? COLORS.themeblue : 'lightgray', //if clickedNext button is clicked, then make the pagination dot color as gray(disabled)
                        marginRight: 12,
                        elevation: 2,
                      }}></View>

                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 15,
                        backgroundColor: clickedNext
                          ? COLORS.themeblue
                          : 'lightgray',

                        elevation: 2,
                      }}></View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 15,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 30,
                    backgroundColor: getBackground(),
                    alignSelf: 'center',
                    paddingHorizontal: 80,
                    padding: 8,
                    elevation: 7,
                  }}
                  // Uncomment it if you want to make registration api call to db
                  onPress={() => setClickedNext(true)}
                  // onPress={() => signUp({ name1, surname, phone, email, password })}
                >
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    {clickedNext ? 'Üye Ol' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 22,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}
                  style={{alignContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'white',
                      fontWeight: '600',
                      paddingBottom: 20,
                    }}>
                    Hesabınız var mu ? Şimdi Giriş Yapın
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
