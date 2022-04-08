import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import LottieView from 'lottie-react-native';
import LogoutButton from '../../components/Login/LogoutButton';

export default function Logout(props) {
  // modal's visibility state
  const [visible, setVisible] = React.useState(true);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      {/* clicking outside of modal, will close the modal */}
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        {/* outside area */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback>
            {/* Modal Content->Alert Container */}
            <View style={styles.container}>
              <View style={{position: 'absolute', top: 20, left: 30}}>
                {/* title of alert message */}
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: COLORS.black,
                  }}>
                  Çıkış Yap
                </Text>
                {/* descr of alert message */}
                <Text
                  style={{
                    top: 10,
                    fontSize: 17,
                    fontWeight: '300',
                    color: COLORS.black,
                  }}>
                  Çıkış Yapmak istediğinden emin misin?
                </Text>
              </View>
              {/* Logout button */}
              <LogoutButton navigation={props.navigation} />
              {/* discard button that closes modal */}
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: 'gray',
                  alignSelf: 'center',
                  paddingHorizontal: 90,
                  padding: 15,
                  marginTop:20
                }}
                onPress={() => setVisible(false)}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                  Vazgeç
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.width / 1.2,
    width: SIZES.width / 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
