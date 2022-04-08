import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../../axios';
import {RegisterFormContext} from '../../AuthContextProvider/RegisterFormContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const {formData, clickedData} = useContext(RegisterFormContext);

  const [formFilled, IsformFilled] = formData;
  const [isValidName, setIsValidName] = useState({error: false, message: null});
  const [isValidSurname, setIsValidSurname] = useState({
    error: false,
    message: null,
  });
  const [isValidEmail, setIsValidEmail] = useState({
    error: false,
    message: null,
  });
  const [isValidPhone, setIsValidPhone] = useState({
    error: false,
    message: null,
  });

  const [isValidPwd, setIsValidPwd] = useState({
    error: false,
    message: null,
  });

  console.log(name, surname, email, password, isValidName);

  const checkEmail = () => {
    let Regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const condition = Regex.test(email.toLowerCase());

    if (condition) {
      console.log(email, ' is valid');
      setIsValidEmail({
        error: false,
        message: null,
      });

      return false;
    } else {
      setIsValidEmail({
        error: true,
        message:
          'Girdiğiniz email bilgisi geçerli değildir. Lütfen devam etmek için, tekrar deneyiniz',
      });

      console.log(email, ' is not valid');

      return true;
    }
  };

  const checkName = (name, type) => {
    let Regex = /^[a-z ,.'-]+$/i;
    const condition = Regex.test(name.toLowerCase());

    if (condition) {
      console.log(name, ' is valid');

      if (type == 'ad') {
        setIsValidName({
          error: false,
          message: null,
        });
      } else {
        setIsValidSurname({
          error: false,
          message: null,
        });
      }

      return false;
    } else {
      console.log(name, ' is not valid');
      if (type == 'ad') {
        setIsValidName({
          error: true,
          message: `Girdiğiniz ad: ${name} bilgisi geçerli değildir. Lütfen devam etmek için, tekrar deneyiniz`,
        });
      } else {
        setIsValidSurname({
          error: true,
          message: `Girdiğiniz soyad: ${name} bilgisi geçerli değildir. Lütfen devam etmek için, tekrar deneyiniz`,
        });
      }

      return true;
    }
  };

  const checkPassword = () => {
    var Regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const condition = Regex.test(password);
    if (condition) {
      setIsValidPwd({
        error: false,
        message: null,
      });

      return false;
    } else {
      setIsValidPwd({
        error: true,
        message:
          'Girdiğiniz password bilgisi geçerli değildir. Lütfen devam etmek için, tekrar deneyiniz',
      });

      return true;
    }
  };

  const checkForm = () => {
    let emailCheck = checkEmail();
    let nameCheck = checkName(name, 'ad');
    let surnameCheck = checkName(surname, 'soyad');
    let passwordCheck = checkPassword();
    if (phone == null || phone.length < 11) {
      setIsValidPhone({
        error: true,
        message: `Girdiğiniz ${phone} telefon bilgisi  geçerli değildir .Lütfen Geçerli Bir Telefon Numarası Giriniz`,
      });
    } else {
      setIsValidPhone({
        error: false,
        message: null,
      });
    }

    if (
      !emailCheck &&
      !nameCheck &&
      !surnameCheck &&
      phone != null &&
      !passwordCheck
    ) {
      IsformFilled(true);
      AsyncStorage.setItem(
        'formCredentials',
        JSON.stringify({name, surname, email, phone, password}),
      );
    }
  };

  React.useEffect(() => {
    console.log('pwd changed', password);
    if (password !== '' && typeof password != 'undefined') {
      checkForm();
    }
  }, [password,name,surname,email,phone]);

  const handleSubmit = () => {
    // console.log('form:', name, surname, email, phone, password);
    // console.log(":",email);
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
  return (
    <ScrollView style={{height: 520}}>
      <View style={{backgroundColor: 'white'}}>
        <View style={{padding: 10, paddingHorizontal: 30}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 28,
              color: 'rgb(21, 133, 225)',
            }}>
            Welcome
          </Text>
          <Text style={{fontSize: 16}}>
            Please provide all the required information
          </Text>
        </View>
        <SafeAreaView style={{marginLeft: 70}}>
          <View style={{marginTop: 35}}>
            <Text style={{fontSize: 18}}>Name</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'rgb(21, 133, 225)',
              borderBottomWidth: 2,
              paddingBottom: -3,
              width: '75%',
              marginBottom: 25,
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderRadius: 15,
                fontSize: 18,
                paddingHorizontal: 25,
                backgroundColor: 'transparent',
                width: '100%',
              }}
              placeholder="Name"
              onChangeText={name => setName(name)}
              value={name}
            />
            <Icon
              name="user"
              size={16}
              style={{alignSelf: 'center'}}
              color="rgb(21, 133, 225)"
            />
          </View>
          {/* Name Error Field */}
          {isValidName.error && (
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {isValidName.message}
              </Text>
            </View>
          )}
          <View>
            <Text style={{fontSize: 18}}>Surname</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'rgb(21, 133, 225)',
              borderBottomWidth: 2,
              paddingBottom: -3,
              width: '75%',
              marginBottom: 25,
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderRadius: 15,
                fontSize: 18,
                paddingHorizontal: 25,
                backgroundColor: 'transparent',
                width: '100%',
              }}
              placeholder="Surname"
              onChangeText={surname => setSurname(surname)}
              value={surname}
            />
            <Icon
              name="user"
              size={16}
              style={{alignSelf: 'center'}}
              color="rgb(21, 133, 225)"
            />
          </View>
          {/* Surname Error Field */}
          {isValidSurname.error && (
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {isValidSurname.message}
              </Text>
            </View>
          )}
          <View>
            <Text style={{fontSize: 18}}>Email</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'rgb(21, 133, 225)',
              borderBottomWidth: 2,
              paddingBottom: -3,
              width: '75%',
              marginBottom: 25,
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderRadius: 15,
                fontSize: 18,
                paddingHorizontal: 25,
                backgroundColor: 'transparent',
                alignSelf: 'stretch',
              }}
              placeholder="Email"
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
          {/* Email Error Field */}
          {isValidEmail.error && (
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {isValidEmail.message}
              </Text>
            </View>
          )}
          <View>
            <Text style={{fontSize: 18}}>Phone Number</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: 'rgb(21, 133, 225)',
              borderBottomWidth: 2,
              paddingBottom: -3,
              width: '75%',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={{
                borderRadius: 15,
                fontSize: 18,
                paddingHorizontal: 25,
                backgroundColor: 'transparent',
                alignSelf: 'stretch',
              }}
              placeholder="Phone Number"
              onChangeText={phone => setPhone(phone)}
              value={phone}
            />
            <Icon
              name="phone"
              size={16}
              style={{alignSelf: 'center', justifyContent: 'flex-end'}}
              color="rgb(21, 133, 225)"
            />
          </View>
           {/* Phone Error Field */}
           {isValidPhone.error && (
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {isValidPhone.message}
              </Text>
            </View>
          )}
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
           {/* Pwd Error Field */}
           {isValidPwd.error && (
            <View style={{marginBottom: 10}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                {isValidPwd.message}
              </Text>
            </View>
          )}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
