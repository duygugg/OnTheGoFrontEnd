import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faQrcode,
  faCameraRetro,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RegisterFormContext} from '../../AuthContextProvider/RegisterFormContext';
export default function NFCPhotoButton() {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Button text={'Scan with NFC'} />
      <Button text={'Upload Photo'} />
    </View>
  );
}

const Button = props => {
  const {formData, clickedData, registerBtnData} =
    useContext(RegisterFormContext);

  const [registerBtnClicked, setRegisterBtnClicked] = registerBtnData;
  const takePhotoFromCamera = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, res => {
      console.log('res\n', res);
      setRegisterBtnClicked(true);
    });
  };
  return (
    <View style={{marginTop: 40, marginBottom: 40}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.text == 'Upload Photo' && takePhotoFromCamera()}>
        <Text style={styles.textStyle}>{props.text}</Text>
        <FontAwesomeIcon
          icon={props.text == 'Scan with NFC' ? faQrcode : faCameraRetro}
          color={'white'}
          size={25}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', top: 20}}>
        <FontAwesomeIcon icon={faInfoCircle} color={'lightgray'} />
        <View style={{left: 10, width: SIZES.width * 0.8}}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tincidunt ex sit amet blandit dapibus.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.themeblue,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.white,
  },
});
