import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VehicleCard from '../../components/Plates/VehicleCard';
import {COLORS, SIZES} from '../../constants';
import {PlatesContext} from '../../AuthContextProvider/PlatesContext';
import AddPlate from '../../components/Plates/AddPlateForm';
import {DebtPassContext} from '../../ContextProvider/DebtPassContext';
import LoaderNoNetwork from '../../components/Plates/LoaderNoNetwork';
import AlertContainer from '../../components/Profile/AlertContainer';
import {Picker} from '@react-native-picker/picker';
import images from '../../constants/images';
import {useIsFocused} from '@react-navigation/native';
import axiosInstance from '../../axios';
import {ProfileContext} from '../../AuthContextProvider/ProfileContext';

export default function MyPlates(props) {
  const {plateDataa, updateData} = React.useContext(PlatesContext);
  const [plates, setPlates] = plateDataa;
  const [visible, setVisible] = React.useState(false); //visiblity of add plate form
  const {PassData} = React.useContext(DebtPassContext);
  const [DebtPasses, setDebtPasses] = PassData;
  const [updated, setUpdated] = updateData; //data that checks whether new plate added or deleted
  const [loading, setLoading] = useState(true); //loader of whether add plate or delete plate api calls has ended
  // and state that storesplate.data has been updated

  //is
  const [isClicked, setIsClicked] = useState(false); //checks clicked button state of add plate form
  const [filterBarClicked, setFilterBarClicked] = useState(false);
  const [activeTab, setActiveTab] = useState(''); //state for checking selected year range button value
  const [applyFilters, setApplyFilters] = useState(false); //state checks whether applyFilters button is clicker or not
  const isFocused = useIsFocused();
  React.useEffect(() => {
    console.log('\nhey focused!', isFocused, 'is updated?', updated, '/n/n');

    // getPlateData();
  }, [isFocused]);

  //category filter in filters component takes text as its value and based on itext text data, plate results are being filtered
  const [text, onChangeText] = React.useState('ALL');

  // based on filter type, whether user selects category(model) of vehicle to be filtered or range of date of vehicle to be filtered
  //based on text value we filter data
  const activateFilterBy = (text, type, plateData) => {
    var data = [];

    if (type == 'model') {
      data = plateData.filter(item => item.model == text);
    } else if ('year') {
      var dates = activeTab.split('-');
      const minYear = dates[0];
      const maxYear = dates[1];

      data = plateData.filter(
        item =>
          Number(item.year) >= Number(minYear) &&
          Number(item.year) <= Number(maxYear),
      );
    } else {
      data = plateData;
    }
    return data;
  };

  // const getPlateData = async () => {
  //   var config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Cache-Control': 'no-cache',
  //     },
  //   };
  //   console.log(
  //     updated ? '\napi callUpDATED is starting..\n' : '\napii call started\n',
  //   );

  //   setPlates({loading: true, data: null, error: false});
  //   const apiUrl = 'getPlates/';
  //   await axiosInstance
  //     .get(apiUrl, config)
  //     .then(response => {
  //       console.log('\nres:', response.data, plates.loading, plates.data);
  //       setPlates({
  //         loading: false,
  //         data: response.data,
  //         error: false,
  //       });
  //     })
  //     .catch(err => {
  //       console.log('error server fetch:', err);
  //       setPlates({loading: false, data: null, error: true});
  //     });
  // };

  React.useEffect(() => {
    console.log('plates loading..', plates.loading, plates.data);
  }, [plates.loading]);

  // user can select both of the filter option or only one of them or can select nothing at all
  //based on these probabilities, call filter method or return mapped plate data without filtering
  const getData = () => {
    const platess = mapPlatesData(plates.data);

    if (applyFilters) {
      if (activeTab != '' && text != 'ALL') {
        let filtered_data_byYear = activateFilterBy(activeTab, 'year', platess);
        let filtered_data_byModelandYear = activateFilterBy(
          text,
          'model',
          filtered_data_byYear,
        );
        return filtered_data_byModelandYear;
      } else if (activeTab != '') {
        let filtered_data_byYear = activateFilterBy(activeTab, 'year', platess);
        return filtered_data_byYear;
      } else if (text != 'ALL') {
        let filtered_data_byModel = activateFilterBy(text, 'model', platess);
        return filtered_data_byModel;
      } else {
        return platess;
      }
    } else {
      return platess;
    }
  };

  //
  const getCount = type => {
    const array = mapPlatesData(plates.data);
    let result = [...new Set(array.map(item => item[type]))];
    return result;
  };

  // reflect changes in selected date filter option and  category filter opiton
  React.useEffect(() => {
    console.log('tab:', activeTab, 'model:', text);
  }, [activeTab, text]);

  React.useEffect(() => {}, [DebtPasses.loading]);

  const mapPlatesData = platessData => {
    let data = platessData;
    if (platessData != null) {
      data = platessData.map(item => ({
        key: `${item.id}`,
        plate_no: item.plate_no,
        color: item.color,
        year: item.year,
        model: item.model,
        brand: item.brand,
        className: item.className,
      }));
    }

    return data;
  };

  // uses activeTab state and d,splays year filter buttons including the static range values
  const RangeButton = props => {
    return (
      // <ScrollView>
      <TouchableOpacity
        onPress={() =>
          setActiveTab(prevState => (prevState == props.text ? '' : props.text))
        }
        style={{
          backgroundColor:
            activeTab == props.text ? COLORS.themeblue : COLORS.white,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          paddingHorizontal: SIZES.width > 1200 ? 15 : 10,
          borderColor: activeTab == props.text ? 'white' : 'lightgray',
          borderWidth: 1.5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: SIZES.width > 1200 ? 16 : 14,
            fontWeight: '500',
            color: activeTab == props.text ? 'white' : 'gray',
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>
      // </ScrollView>
    );
  };

  // IT'S FILTER MODAL  COMPOENENT
  //CALLED AS HEADERBUTTON BC FILTER BUTTON PLACED ON HEADER
  //DO NOT CONFUSE THIS COMPONENT AS HEADER
  //ITS FILTER MODAL COMPONENT!!1
  const HeaderButton = props => {
    return (
      <Modal
        visible={filterBarClicked}
        // transparent={true}
        presentationStyle="overFullScreen"
        transparent
        animationType={'fade'}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: SIZES.width,
              height:
                SIZES.width > 1200 ? SIZES.height * 0.7 : SIZES.height * 0.85,
              borderRadius: 25,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{position: 'absolute', left: 0}}>
                <TouchableOpacity
                  style={{
                    borderRadius: 15,
                    backgroundColor: 'lightgray',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 45,
                    height: 45,
                    opacity: 0.65,
                  }}
                  onPress={() => setFilterBarClicked(false)}>
                  <Icon name="close" size={20} />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* Title */}
                <Text style={styles.title}>Filters</Text>
              </View>
            </View>

            {/* Dropdown button for selecting plate number */}
            <Text style={{marginTop: 25, fontWeight: 'bold', fontSize: 22}}>
              Category
            </Text>
            <View style={styles.input}>
              <Picker
                selectedValue={text}
                style={{
                  height: 50,
                  width: SIZES.width - 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  borderRadius: 25,
                }}
                onValueChange={itemValue => onChangeText(itemValue)}>
                {/* <Picker.Item
                  style={{fontSize: 13, color: 'gray'}}
                  label="Please select an option..."
                  value="0"
                /> */}
                <Picker.Item
                  // key={item.key}
                  style={{fontSize: 15, color: 'black'}}
                  label={'ALL'}
                  value={'ALL'}
                  key={0}
                />
                {/* based on distinct model names user vehickes, map this modal news 
                and display each one of them as picker item */}
                {getCount('model').map(item => (
                  <Picker.Item
                    // key={item.key}
                    style={{fontSize: 15, color: 'black'}}
                    label={item}
                    value={item}
                    key={item.key}
                  />
                ))}
              </Picker>
            </View>
            {/* Year Range Picker */}
            <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 22}}>
              Year
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <RangeButton text={'1990-2005'} />
              <RangeButton text={'2005-2012'} />
              <RangeButton text={'2012-2022'} />
            </View>

            {/* Color Picker */}
            {/* <Text style={{marginTop: 25, fontWeight: 'bold', fontSize: 22}}>
              Color
            </Text> */}

            {/* Add Button */}
            <TouchableOpacity
              onPress={() => {
                setApplyFilters(true);
                setFilterBarClicked(false);
              }}
              // disabled={canClick}
              style={{
                backgroundColor: COLORS.themeblue,
                width: SIZES.width / 1.6,
                opacity: 1,
                alignSelf: 'center',
                top: 50,
                borderRadius: SIZES.width > 1200 ? 50 : 15,
                padding: SIZES.width > 1200 ? 20 : 15,
                left: 10,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (plates.loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: SIZES.padding,
        }}>
        <LoaderNoNetwork text={'loading'} />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: SIZES.padding,
        top: SIZES.base,
      }}>
      {plates.error ? (
        <LoaderNoNetwork text={'no network'} />
      ) : (
        // {/* Vehicle List Header */}
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  fontSize: SIZES.double * 1.2,
                  fontWeight: 'bold',
                  color: COLORS.black,
                }}>
                My Vehicles ({plates.data == null ? 0 : plates.data.length}){' '}
              </Text>
            </View>
            {plates.data?.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => setFilterBarClicked(!filterBarClicked)}>
                  <Icon
                    name="filter"
                    size={SIZES.double * 1.4}
                    color={filterBarClicked ? COLORS.themeblue : 'black'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Filter Bar(Displayed only on icon click) */}
          {filterBarClicked && (
            <View
              style={{
                flex: 1,

                marginTop: 10,
              }}>
              <HeaderButton />
            </View>
          )}
          {/* Vehicle Card Component */}
          <View style={{marginBottom: 120}}>
            {/* Can be deleted for later use, it's just for checking loading and form submit state */}
            {/* <Text>
              {loading ? 'loading' : 'not loading'}{' '}
              {isClicked ? 'clicked' : 'not clicked'}
            </Text> */}
            {getData()?.length == 0 && (
              <>
                <Text>
                  Üzgünüz, filtereleme seçenekleriniz ile eşleşen sonuç
                  bulamadık.Lütfen, tekrar deneyiniz.
                </Text>
                <Image
                  style={{width: SIZES.width, height: SIZES.width * 0.7}}
                  source={images.failded}
                />
              </>
            )}
            <FlatList
              data={getData()}
              renderItem={({item}) => (
                <>
                  <VehicleCard
                    quantity={plates.data.length}
                    item={item}
                    navigation={props.navigation}
                    key={item.id}
                    updated={updated}
                    setUpdated={setUpdated}
                  />
                </>
              )}></FlatList>
          </View>
          <AddPlate
            visible={visible}
            setVisible={setVisible}
            updated={updated}
            setUpdated={setUpdated}
            navigation={props.navigation}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            loading={loading}
            setLoading={setLoading}
          />
          {/* Add plate section */}
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              top: 20,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}>
            {/* <Text
              style={{
                fontSize: 22,
                color: 'black',
                opacity: 0.8,
                fontWeight: '600',
              }}>
              + Plaka Ekle
            </Text> */}
          </TouchableOpacity>
        </>
      )}
      {isClicked && plates.loading && (
        <AlertContainer
          visible={plates.loading}
          text={'Yükleniyor, Lütfen işlem sonucunuzu bekleyiniz'}
        />
      )}
      {isClicked && !plates.loading && (
        <AlertContainer
          visible={true}
          clicked={isClicked}
          loading={loading}
          setLoading={setLoading}
          setclicked={setIsClicked}
          text={
            !plates.error
              ? 'Plakanız başarılı bir şekilde sisteme eklenmiştir'
              : 'Girdiğiniz plakaya ait sistemde geçerli bir araç bulunamamıştır.Lütfen geçerli bir plaka girerek, tekrar deneyiniz.'
          }
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#000',
  },
  description: {
    left: 10,
    color: 'gray',
    fontSize: 16,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 12,
  },
});
