import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import {useIsFocused} from '@react-navigation/native';
import AlertContainer from '../../components/Profile/AlertContainer';
import {ProfileContext} from '../../AuthContextProvider/ProfileContext';
import axiosInstance from '../../axios';

export default function ProfileInfoSection(props) {
  const {userData, userId, updatedData} = React.useContext(ProfileContext);
  const [user, setUser] = userData;
  const [userid] = userId;
  const [updated, setUpdated] = updatedData;
  const [text, setText] = React.useState({
    name: user.user?.first_name,
    surname: user.user?.last_name,
    phone: user.user?.phone_number,
    email: user.user?.email,
    tckn: user.user?.tckn,
  });

  const [submitted, setSubmitted] = React.useState(false); 

  const [clicked, setClicked] = React.useState(false);

  const [error, setError] = React.useState(false);

  const [content, setContent] = React.useState('');

  const [isValid, setValid] = React.useState(true);

  // console.log('error:', error);
  const isFocused = useIsFocused();
  console.log('focused?', isFocused, user.user);



  const handleEmailValidation = () => {
    //   var Regex = '/^[^a-zA-Z]*$/';
    let Regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const condition = Regex.test(text.email.toLowerCase());

    if (condition) {
      console.log(text.email, ' is valid');
      return false;
    } else {
      setContent('email');
      console.log(text.email, ' is not valid');

      return true;
    }
  };

  const handleNameValidation = (text, type) => {
    let Regex = /^[a-z ,.'-]+$/i;
    const condition = Regex.test(text.toLowerCase());

    if (condition) {
      console.log(text, ' is valid');

      return false;
    } else {
      console.log(text, ' is not valid');

      setContent(type);

      return true;
    }
  };

  const updateProfileInfo = async () => {
    const profileForm = {
      email: text.email,
      first_name: text.name,
      last_name: text.surname,
      phone_number: text.phone,
    };
    setSubmitted(false);
    await axiosInstance
      .put(`user/update_profile/${userid}/`, profileForm)
      .then(response => {
        console.log('updated!!');
        console.log(response.data);
        setUser({loading: false, user: response.data, updated: true});
        setSubmitted(true);
        setUpdated(true);
        setValid(true);
      })
      .catch(error => {
        console.log('profile update went wrong:\n', error);
        setSubmitted(true);
        setValid(false);
      });
  };
  const handleValidation = () => {
    let er1 = handleNameValidation(text.name, 'name');
    let er2 = handleNameValidation(text.surname, 'surname');
    let er3 = handleEmailValidation();
    console.log('errors.', er1, er2, er3);
    if (er1 || er2 || er3) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = () => {
    setClicked(true);
    setContent('');
    console.log(content);
    let error = handleValidation();
    setError(error);

    if (error === false) {
      updateProfileInfo();
    }

    console.log('hey');
    // props.navigation.navigate('Profile', {
    //   screen: 'EditProfile',
    //   params: {
    //     error: error,
    //     content: content,
    //   },
    // });
  };

  const textChange = async = (text)=>{
    setText(prevState => ({
      name: text,
      surname: prevState.surname,
      phone: prevState.phone,
      email: prevState.email,
      tckn: prevState.tckn,
    }))
  }

  React.useEffect(() => {
    console.log('form\n',  clicked, submitted, isValid,error);
  }, [clicked]);

  return (
    <View style={styles.container}>
      {/* <Text>{updated ? 'updated' : 'not uodated'}</Text> */}
      {clicked &&!error&& (
        <AlertContainer
          visible={!error}
          text={
            isValid
              ? 'Bilgileriniz Başarı ile Değiştirildi!!!'
              : 'Bir Hata ile Karşılaşıldı'
          }
        />
      )}
      <Text style={{fontSize: 20, fontWeight: '400'}}>Hesap Bilgilerim</Text>
      {/* Name */}
      <View style={styles.infoContainer}>
        <Text>Adı</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            mode={'outlined'}
            placeholder="Adınızı Giriniz"
            value={text.name}
            onChangeText={text =>
              textChange(text)
            }
            editable={true}
            //clearTextOnFocus={true} ->ios
            placeholderTextColor="lightgray"
            style={styles.textInput}
          />
        </View>
        {clicked && content == 'name' && (
          <Text style={{color: 'red', marginTop: 10}}>
            Girdiğiniz ad bilgisi hatalıdır. Lütfen ad bilgisini kontrol ederek
            tekrar deneyiniz
          </Text>
        )}
      </View>

      {/* Surname */}
      <View style={styles.infoContainer}>
        <Text>Soyadı</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            mode={'outlined'}
            placeholder="Soyadınızı Giriniz"
            selectionColor={'black'}
            value={text.surname}
            onChangeText={text =>
              setText(prevState => ({
                name: prevState.name,
                surname: text,
                phone: prevState.phone,
                email: prevState.email,
                tckn: prevState.tckn,
              }))
            }
            editable={true}
            placeholderTextColor="lightgray"
            style={styles.textInput}
          />
        </View>
        {clicked && content == 'surname' && (
          <Text style={{color: 'red', marginTop: 10}}>
            Girdiğiniz soyad bilgisi hatalıdır. Lütfen soyad bilgisini kontrol
            ederek tekrar deneyiniz
          </Text>
        )}
      </View>

      {/* Phone */}
      <View style={styles.infoContainer}>
        <Text>Telefon</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            mode={'outlined'}
            placeholder="Telefon Numaranızı Giriniz"
            selectionColor={'black'}
            value={text.phone}
            onChangeText={text =>
              setText(prevState => ({
                name: prevState.name,
                surname: prevState.surname,
                phone: text,
                email: prevState.email,
                tckn: prevState.tckn,
              }))
            }
            editable={true}
            placeholderTextColor="lightgray"
            style={styles.textInput}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Email */}
      <View style={styles.infoContainer}>
        <Text>Email</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Email'inizi Giriniz"
            selectionColor={'black'}
            value={text.email}
            onChangeText={text =>
              setText(prevState => ({
                name: prevState.name,
                surname: prevState.surname,
                phone: prevState.phone,
                email: text,
                tckn: prevState.tckn,
              }))
            }
            editable={true}
            placeholderTextColor="lightgray"
            style={styles.textInput}
          />
        </View>
        {clicked && content == 'email' && (
          <Text style={{color: 'red', marginTop: 10}}>
            Girdiğiniz email adresi geçerli değildir. Lütfen email bilgisini
            kontrol ederek tekrar deneyiniz
          </Text>
        )}
      </View>

      {/* TC */}
      <View style={styles.infoContainer}>
        <Text>TCKN</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            mode={'outlined'}
            selectionColor={'black'}
            placeholder={text.tckn == null ? '2535627292' : text.tckn}
            editable={false}
            placeholderTextColor="lightgray"
            style={{fontWeight: '600', fontSize: 16}}
          />
        </View>
      </View>
      {/* Submit Button */}
      <View style={{justifyContent: 'center', marginTop: 20, marginBottom: 50}}>
        <TouchableOpacity
          onPress={() => handleClick()}
          style={[
            styles.buttonContainer,
            {backgroundColor: COLORS.neongreen},
            // {backgroundColor: error ? COLORS.neongreen : 'lightgray'},
          ]}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.double,
    width: SIZES.width,
    paddingHorizontal: 50,
  },
  infoContainer: {
    marginTop: SIZES.double,

    alignItems: 'stretch',
  },
  textInputContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: COLORS.light,
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  textInput: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    borderRadius: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    padding: 10,
    width: SIZES.width / 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 25,
    textAlign: 'center',
  },
});
