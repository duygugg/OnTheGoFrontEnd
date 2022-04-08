import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useMemo, useRef} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import axiosInstance from '../../axios';
import {PlatesContext} from '../../AuthContextProvider/PlatesContext';

const AddPlate = props => {
  const { plateDataa} = React.useContext(PlatesContext);
  const [plates, setPlates] = plateDataa;

  const setUpdated = props.setUpdated;
  const sheetRef = useRef(null);
  const [text, onChangeText] = useState(null);
  const [canClick, setCanClick] = useState(false);
  const loading = props.loading;
  const setLoading = props.setLoading;
  const isClicked = props.isClicked;
  const setIsClicked = props.setIsClicked;
  // console.log(canClick);
  const snapPoints = useMemo(() => [80, 350], []);

  const addPlateData = async plateCredentials => {
    const apiUrl = 'plates/create/'; //needs to be applied only if OS == android
    setLoading(true);
    setPlates({
      loading: false,
      data: plates.data,
      error:false
    });

    console.log('plate inquiry');

    await axiosInstance

      .post(apiUrl, plateCredentials)
      .then(response => {
        console.log('added', response.data);
 
        alert("added")
        setPlates({
          loading: false,
          data: [...plates.data, response.data],
          error:false
        });

        setLoading(false);
        // navigation.push('MyVehiclesScreen');
      })
      .catch(err => {
     
        setLoading(false);
        alert("error in adding")
        setPlates({
          loading: false,
          data: plates.data,
          error:true
        });


        console.log('error adding plate:', err.message);
      });
  };

  const getNotaryInquiryResult = async plate => {
    console.log('notary api call started with plate:', plate);

    let controller = new AbortController();
    const apiUrl = `notariesInquiry/${plate}/`; //needs to be applied only if OS == android
    const res = await axiosInstance
      .get(apiUrl, {timeout: setTimeout(() => controller.abort(), 30000)})
      .then(response => {
        console.log('notary res pos!');
        return response.data['record'][0];
      })
      .catch(err => {
        console.log('error server fetch:', err);
        return null;
      });
    return res;
  };

  React.useEffect(() => {
    // console.log(text);
    if (
      typeof text != 'undefined' &&
      text != null &&
      (text.length === 7 || text.length === 8)
    ) {
      if (!isNaN(text.substring(0, 2)) && isNaN(text.substring(3))) {
        // console.log('ok:', text);
        setCanClick(true);
      } else {
        setCanClick(false);
      }
    } else {
      setCanClick(false);
    }
  }, [text]);

  React.useEffect(() => {
    console.log('\nis button clicked:', isClicked, text);
    if (isClicked) {
      const getNotaryCheck = async () => {
        const res = await getNotaryInquiryResult(text);
        console.log('\nnotary response', res);
        if (res != null) {
          // console.log(res);

          addPlateData({
            plate_no: text,
            color: res.color,
            fuel: 'fuel unknown',
            year: res.year,
            model: res.model,
            brand: res.brand,
            className: res.className,
          });
        }
      };
      if (text != null) {
        getNotaryCheck();
      }
    }
  }, [isClicked]);

  React.useEffect(() => {
    console.log('can be clickable', canClick);
  }, [canClick]);

  return (
    <BottomSheet
      bottomSheerColor="#FFFFFF"
      ref={sheetRef}
      visible={!props.visible}
      index={1}
      snapPoints={snapPoints}
      isBackDrop={true}
      isBackDropDismissByPress={true}
      backDropColor="red"
      onClose={() => props.setVisible(false)}
      //onChange={handleSheetChanges}
    >
      <BottomSheetView>
    
          <View style={{marginHorizontal: 15, top: 15}}>
            {/* Title */}
            <Text style={styles.title}>Araç Ekleme</Text>
            {/* Descr */}
            <Text style={styles.description}>
              Eklemek istediğiniz aracınızın plaka numarasını eksiksizce
              doldurun, lütfen.
            </Text>
            {/* Plate input field */}
            <View
              style={{
                backgroundColor: COLORS.light,
                width: SIZES.width / 1.2,
                opacity: 0.5,
                alignSelf: 'center',
                top: 20,
                borderRadius: 15,
              }}>
              <TextInput
                numberOfLines={1}
                onChangeText={text => onChangeText(text)}
                value={text}
                color={'black'}
                fontSize={16}
                placeholder="Plaka Numarası..."
                style={{padding: 20, left: 10}}
              />
            </View>
            {/* Add Button */}
            <TouchableOpacity
              // disabled={canClick}
              style={{
                backgroundColor: canClick ? COLORS.themeblue : 'gray',
                width: SIZES.width / 1.6,
                opacity: 1,
                alignSelf: 'center',
                top: 50,
                borderRadius: 50,
                padding: 20,
                left: 10,
              }}
              onPress={() => {
                if (canClick) {
                  setIsClicked(true);
                } else {
                  console.log('cant click try again');
                }
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                EKLE
              </Text>
            </TouchableOpacity>
          </View>
   
      </BottomSheetView>
    </BottomSheet>
  );
};

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
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
    left: 10,
    letterSpacing: 0.5,
    color: '#000',
  },
  description: {
    left: 10,
    color: 'gray',
    fontSize: 16,
  },
});

export default AddPlate;
