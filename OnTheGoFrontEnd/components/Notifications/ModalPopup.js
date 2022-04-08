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

export default class ModalPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  async handleDelete() {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    axiosInstance
      .delete(`notifications/delete/${props.id}/`)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })

      .then(data => {
        setNotifState({loading: true});
        updateNotifData();
        if (!notifState.loading) {
          props.navigation.navigate('notifications', {
            notifState: notifState,
          });
        }
      })
      .catch(error => {
        // 401
        console.log('\nerror:', error); //Please Authenticate or whatever returned from server
      });
  }
  async componentDidMount() {}

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        statustBarTransculent={true}
        animationType={'fade'}>
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 200,
                  width: '80%',
                  backgroundColor: 'white',
                  borderRadius: 25,
                  paddingVertical: 30,
                  paddingHorizontal: 10,
                }}>
                {/* Message */}
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Silmek istediğinden emin misin?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evely',
                  }}>
                  {/* Confirm Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      paddingHorizontal: 20,
                      padding: 10,
                    }}
                    onPress={() => handleDelete(id)}>
                    <Text style={{color: 'white'}}>Delete</Text>
                  </TouchableOpacity>
                  {/* Cancel button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'gray',
                      paddingHorizontal: 20,
                      padding: 10,
                    }}
                    onPress={() => props.setVisible(false)}>
                    <Text style={{color: 'white'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
