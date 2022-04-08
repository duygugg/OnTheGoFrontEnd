import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {DebtPassContext} from '../../ContextProvider/DebtPassContext';
import {faDollarSign, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import images from '../../constants/images';
import {COLORS, SIZES} from '../../constants/index';
import {useIsFocused} from '@react-navigation/native';
import AlertContainer from '../../components/Profile/AlertContainer';

export default function PaymentPreviewScreen(props) {
  const {totalData, selectedData} = React.useContext(DebtPassContext);
  const [deleteClicked, setDeleteClicked] = React.useState({
    status: false,
    item: null,
  });
  const [selectedItem, setSelectedItem] = selectedData;
  const [deleted, setDeleted] = React.useState(false);

  const [total, setTotal] = totalData; //usememo
  console.log(selectedItem.myArray);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setDeleteClicked({status: false, item: null});
    setDeleted(false);
    console.log('focused');
  }, [isFocused]);

  const removePassFromSelected = item => {
    if (item != null) {
      const arr = selectedItem.myArray.filter(
        arrayItem => arrayItem.id != item.id,
      );
      setSelectedItem({myArray: arr, itemDeleted: item});
      setTotal(prev => prev - item.total_cost);
      setDeleted(true);
      setDeleteClicked({status: false, item: null});
    }
  };
  React.useEffect(() => {
    console.log(selectedItem.myArray);
    if (deleted) {
      console.log('\nnew seletced items:', selectedItem.myArray);
      props.navigation.navigate('PaymentPreviewScreen');
    }
  }, [deleted, selectedItem.myArray.length]);

  const AlertContainerMessage = () => {
    const id = deleteClicked?.item?.id;
    const item = deleteClicked?.item;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteClicked.status}>
        <TouchableWithoutFeedback
          onPress={() => setDeleteClicked({status: false, item: item})}>
          <View
            style={{
              width: SIZES.width,
              height: SIZES.height,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: SIZES.width / 1,
                  width: SIZES.width / 1.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                <View
                  style={{position: 'absolute', top: 20, left: 30, right: 30}}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: COLORS.black,
                    }}>
                    Geçişi Çıkar
                  </Text>
                  <Text
                    style={{
                      top: 10,
                      fontSize: 17,
                      fontWeight: '300',
                      color: COLORS.black,
                    }}>
                    Seçilen {item?.total_cost} TRY Tutarındaki Geçişi Çıkarmak
                    istediğinden Emin Misin?
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'red',
                    alignSelf: 'center',
                    paddingHorizontal: 70,
                    padding: 15,
                    marginTop: 80,
                  }}
                  onPress={() => removePassFromSelected(item)}>
                  <Text
                    style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                    Geçişi Çıkar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'gray',
                    alignSelf: 'center',
                    paddingHorizontal: 90,
                    padding: 15,
                    marginTop: 20,
                  }}
                  onPress={() => setDeleteClicked({status: false, item: item})}>
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

  React.useEffect(() => {
    console.log(deleteClicked);
  }, [deleteClicked]);

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
   
      <AlertContainerMessage />
      {/* <AlertContainer
        text={'İşleminiz Başarı ile Tamamlandı!'}
        visible={deleted}
      /> */}
      <Text style={styles.textTitle}>
        Seçilen Geçişler ({selectedItem.myArray.length})
      </Text>
      <View style={{marginTop: 10, padding: 20, flex: 1}}>
        <View style={{height: SIZES.width * 0.4}}>
          <FlatList
            data={selectedItem.myArray}
            // contentContainerStyle={{maxHeight:150}}
            showsVerticalScrollIndicator={true}
            vertical
            // keyExtractor={({item})=>item.id}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.cardContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setDeleteClicked({status: true, item: item})}
                    style={{position: 'absolute', right: 0}}>
                    <FontAwesomeIcon icon={faTrashCan} color="red" />
                  </TouchableOpacity>
                  <Text style={styles.textStyle}>{item.plate_no}</Text>
                  {/* <FontAwesomeIcon
                    icon={faDollarSign}
                    style={{right: 40,top:10}}
                    size={30}
                    color={'rgba(74, 240, 106, 1)'}
                  /> */}
                </View>
                <View
                  style={{
                    top: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text>Son Ödeme Tarihi</Text>
                    <Text
                      style={{
                        color: 'rgba(74, 220, 106, 1)',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {item.last_payment_date}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.textStyle}>{item.total_cost} TRY</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}></FlatList>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 22}}>Ödenecek Tutar</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{total}</Text>
          </View>
          <View
            style={{
              marginTop: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 22}}>Geçiş Sayısı</Text>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              {selectedItem.myArray.length} Adet
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image
            style={{
              width: SIZES.width * 0.8,
              height: SIZES.width > 1200 ? 250 : 160,
              alignSelf: 'center',
            }}
            source={images.paymentPreview}
            resizeMode={'cover'}
          />
        </View>
      </View>
      {selectedItem.myArray.length > 0 ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={{
            backgroundColor: COLORS.themeblue,
            paddingHorizontal: SIZES.width > 1200 ? 60 : 40,
            alignSelf: 'center',
            marginTop: 0,
            borderRadius: 10,
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: SIZES.width > 1200 ? 22 : 16,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            Onayla ve Ödemeye Geç
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={{
            backgroundColor: COLORS.themeblue,
            paddingHorizontal: SIZES.width > 1200 ? 60 : 40,
            alignSelf: 'center',
            marginTop: 0,
            borderRadius: 10,
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: SIZES.width > 1200 ? 22 : 16,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            Anasayfaya Dön
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(74, 240, 106, 0.5)',
    paddingBottom: 10,
  },
  textTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 30,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    paddingHorizontal: 30,
    elevation: 2,
    marginBottom: 60,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgba(74, 240, 106, 1)',
    textAlign: 'center',
  },
});
