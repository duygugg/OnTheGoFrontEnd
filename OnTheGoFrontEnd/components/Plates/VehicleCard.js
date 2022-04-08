import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import images from '../../constants/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DebtPassContext} from '../../ContextProvider/DebtPassContext';
import {useIsFocused} from '@react-navigation/native';
import axiosInstance from '../../axios';
import AlertContainer from '../Profile/AlertContainer';
import {PlatesContext} from '../../AuthContextProvider/PlatesContext';


export default function VehicleCard({
  item,
  navigation,
  quantity,

}) {
  const {plateData} = React.useContext(DebtPassContext);
  const { plateDataa} = React.useContext(PlatesContext);
  const [plates, setPlates] = plateDataa;
  const [plateNo, setPlateNo] = plateData;
  const [clicked, setClicked] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [error, setError] = useState(false);
  console.log("clicked",clicked)

  const isFocused = useIsFocused();

  useEffect(() => {

    setClicked(false)
  }, [isFocused]);

  const getColor = () => {
    if (item.color.includes('BEYAZ') || item.color.includes('GRİ')) {
      if (item.className.includes('OTOMOBİL')) {
        return images.car;
      } else if (item.className.includes('MOTOSİKLET')) {
        return images.blackMotor;
      } else {
        return images.truck;
      }
    } else if (item.color.includes('MAVİ')) {
      if (item.className.includes('OTOMOBİL')) {
        return images.blueCar;
      } else if (item.className.includes('MOTOSİKLET')) {
        return images.blueMotor;
      } else {
        return images.truck;
      }
    } else if (item.color.includes('SİYAH')) {
      if (item.className.includes('OTOMOBİL')) {
        return images.blackCar;
      } else if (item.className.includes('MOTOSİKLET')) {
        return images.blackMotor;
      } else {
        return images.truck;
      }
    } else if (item.color.includes('KİRMİZİ')) {
      if (item.className.includes('OTOMOBİL')) {
        return images.redCar;
      } else if (item.className.includes('MOTOSİKLET')) {
        return images.redMotor;
      } else {
        return images.truck;
      }
    } else {
      if (item.className.includes('OTOMOBİL')) {
        return images.car;
      } else if (item.className.includes('MOTOSİKLET')) {
        return images.yellowMotor;
      } else {
        return images.truck;
      }
    }
  };

  useEffect(() => {
    // console.log('vehicle card:', plateNo, clicked);
    if (plateNo !== null && clicked) {
      navigation.navigate('DebtPassResults');
    }
  }, [plateNo,clicked]);

  // useEffect(() => {
  //   console.log('Delete triggered!!');
  // }, [alertMessage]);

  useEffect(() => {
    if (deleteClicked) {
      deletePlate();
    }
  }, [deleteClicked]);

  const deletePlate = async () => {
    setError(false);
-
    setPlates({
      loading: true,
      data: plates.data,
      error: false,
    });
    await axiosInstance
      .delete(`plates/delete/${item.plate_no}/`)
      .then(response => {
        console.log(response.data);
        setDeleteClicked(false);
    
        setError(false);
        alert('deleted successfully');
        const newData = plates.data.filter(
          plate => plate.plate_no != item.plate_no,
        );
        setPlates({
          loading: false,
          data: newData,
          error: false,
        });
        // navigation.push('MyVehiclesScreen');
      })
      .catch(error => {
        console.log('error occured deleting plate:', error);
        alert('error occured deleting plate');

        setError(true);
        setPlates({
          loading: false,
          data: plates.data,
          error: true,
        });
      });
  };

  const Alert = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={alertMessage}>
        <TouchableWithoutFeedback onPress={() => setAlertMessage(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <View style={{position: 'absolute', top: 20, left: 30}}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    Aracı Sil
                  </Text>
                  <Text
                    style={{
                      top: 10,
                      fontSize: SIZES.width > 1200 ? 17 : 14,
                      fontWeight: '300',
                      color: COLORS.black,
                      width: SIZES.width / 1.5,
                    }}>
                    {item.plate_no} Plakalı Aracını Silmek istediğinden emin
                    misin?
                  </Text>
                </View>
                {/* Delete Button */}
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    paddingHorizontal: 110,
                    padding: 15,
                    marginTop: 80,
                  }}
                  onPress={() => setDeleteClicked(true)}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    Sil
                  </Text>
                </TouchableOpacity>
                {/* Cancel button */}
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'gray',
                    alignSelf: 'center',
                    paddingHorizontal: 90,
                    padding: 15,
                    marginTop: 20,
                  }}
                  onPress={() => setAlertMessage(false)}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    Vazgeç
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  return (
    <View
      style={{
        height: quantity > 3 ? 160 : 280,
        backgroundColor: 'transparent',
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
      }}>
      <Alert />
      <AlertContainer
        visible={error}
        text={'Araç Silinemedi!!! Lütfen Sonra Tekrar Deneyiniz'}
      />
      <View
        style={{
          height: quantity > 3 ? 160 : 280,
          backgroundColor: COLORS.white,
          borderRadius: 25,
          top: 20,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'orange',
            height: 100,
          }}>
          {/* Car Image */}
          <View style={{bottom: 50, width: '50%'}}>
            <Image
              source={getColor()}
              resizeMode={'contain'}
              style={{
                height: quantity > 3 ? 100 : SIZES.width > 1200 ? 160 : 120,
                width: quantity > 3 ? 120 : SIZES.width > 1200 ? 220 : 160,
              }}
              // tintColor={'red'}
            />
          </View>
          {/* Car Info */}
          <View style={{top: 20, width: '50%', paddingRight: 20}}>
            <Text
              style={{
                fontSize:
                  quantity > 3
                    ? SIZES.double * 1.2
                    : SIZES.width > 1200
                    ? SIZES.double * 1.6
                    : SIZES.double * 1.3,
                fontWeight: 'bold',
                color: COLORS.black,
                flexShrink: 1,
                textAlign: 'right',
              }}>
              {item.brand}{' '}
            </Text>
            <Text
              style={{
                fontSize:
                  quantity > 3
                    ? SIZES.double * 1.2
                    : SIZES.width > 1200
                    ? SIZES.double * 1.3
                    : SIZES.double * 1.2,
                fontWeight: 'bold',
                color: 'gray',
                textAlign: 'right',
              }}>
              {item.year}
            </Text>
          </View>
        </View>

        <View style={{left: 40, flexDirection: 'row'}}>
          <Text
            style={{
              fontSize:
                quantity > 3
                  ? SIZES.double * 1
                  : SIZES.width > 1200
                  ? SIZES.double * 1.2
                  : SIZES.double * 1.1,
              fontWeight: 'bold',
              color: 'gray',
              bottom: 20,
            }}>
            Model
          </Text>
          <Text
            style={{
              fontSize:
                quantity > 3
                  ? SIZES.double * 1
                  : SIZES.width > 1200
                  ? SIZES.double * 1.2
                  : SIZES.double * 1.1,
              fontWeight: 'bold',
              color: COLORS.black,
              bottom: 20,
              left: 20,
            }}>
            {item.model}
          </Text>
        </View>
        {/* Plate Number and Details */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 60,
            // backgroundColor: 'pink',
          }}>
          <View style={{left: 40}}>
            <Text
              style={{
                fontSize:
                  quantity > 3
                    ? SIZES.double * 1
                    : SIZES.width > 1200
                    ? SIZES.double * 1.2
                    : SIZES.double * 1.1,
                fontWeight: 'bold',
                color: 'gray',
                bottom: 20,
              }}>
              Plate Number
            </Text>
            <Text
              style={{
                fontSize:
                  quantity > 3
                    ? SIZES.double * 1.2
                    : SIZES.width > 1200
                    ? SIZES.double * 1.6
                    : SIZES.double * 1.4,
                fontWeight: 'bold',
                color: COLORS.black,
                bottom: 20,
              }}>
              {item.plate_no}
            </Text>
          </View>

          {/* Button */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setPlateNo(item.plate_no);
                setClicked(true);
              }}
              style={{
                backgroundColor: 'rgba(15, 16, 242,0.8)',
                paddingHorizontal: 40,
                flexDirection: 'row',

                borderTopLeftRadius: 25,
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: SIZES.double,
                  fontWeight: 'bold',
                  color: COLORS.white,
                }}>
                Sorgula
              </Text>
              <Icon name="search" color={'white'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAlertMessage(true);
              }}
              style={{
                backgroundColor: 'rgba(233,30, 80,1)',
                paddingHorizontal: 40,
                flexDirection: 'row',
                borderBottomEndRadius: 25,
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <Text
                style={{
                  fontSize: SIZES.double,
                  fontWeight: 'bold',
                  color: COLORS.white,
                  right: 10,
                }}>
                Sil
              </Text>
              <Icon name="trash" color={'white'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
