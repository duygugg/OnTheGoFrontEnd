import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import LottieView from 'lottie-react-native';

export default function AlertContainer(props) {
  const [visible, setVisible] = React.useState(props.visible);
  // console.log('hey alert:', visible);
  React.useEffect(() => {
    if (!visible && typeof props.clicked != 'undefined') {
      props.setclicked(false);
      props.setLoading(true);
    }
  }, [visible]);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <LottieView
                source={
                  props.text ==
                    'Plakanız başarılı bir şekilde sisteme eklenmiştir' ||
                  props.text ==
                    'Yükleniyor, Lütfen işlem sonucunuzu bekleyiniz' ||
                  props.text == 'Bilgileriniz Başarı ile Değiştirildi!!!'
                  ||
                  props.text == 'İşleminiz Başarı ile Tamamlandı!'
                    ? require('../../assets/animations/8428-loader.json')
                    : require('../../assets/animations/94303-failed.json')
                }
                autoPlay
                loop
                style={{height: SIZES.height * 0.25, width: SIZES.width * 0.25}}
              />

              <Text>{props.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.width / 1.5,
    width: SIZES.width / 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: SIZES.height / 3.5,
  },
});
