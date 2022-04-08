import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PlatesContext} from '../../AuthContextProvider/PlatesContext';
import {PassContext} from '../../AuthContextProvider/PassContext';
import {useIsFocused} from '@react-navigation/native';

export default function SearchBar(props) {
  const [text, onChangeText] = React.useState();
  const {plateDataa, updateData} = React.useContext(PlatesContext);
  const [plates, setPlates] = plateDataa;
  const {PassData, plateData, ownerDateData} = React.useContext(PassContext);
  const [plateNo, setPlateNo] = plateData;
  const [ownerDate, setOwnerDate] = ownerDateData;
  const [clicked, setClicked] = React.useState(false);
  const [updated, setUpdated] = updateData;

  const isFocused = useIsFocused();

  useEffect(() => {
    setPlateNo(null);
    console.log('went back to screen:', plateNo, updated);
    setUpdated(true);
  }, [isFocused]);

  useEffect(() => {
    console.log('pass creen:', plateNo, clicked);
    if (plateNo !== null && clicked) {
      props.navigation.navigate('PassResults');
    }
  }, [plateNo]);

  useEffect(() => {
    console.log(plates.data);
  }, [plates.loading]);

  const handleChangeText = itemValue => {
    console.log(itemValue);
    if (itemValue != '0') onChangeText(itemValue);
  };

  const mapPlatesData = () => {
    const data = plates.data.map(item => ({
      key: `${item.id}`,
      plate_no: item.plate_no,
      color: item.color,
      fuel: item.fuel,
      year: item.year,
      model: item.model,
      owner_start_date: item.owner_start_date,
    }));

    return data;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.double * 4,
        flexDirection: 'row',
      }}>
      {/* Dropdown button for selecting plate number */}
      <View style={styles.input}>
        <Picker
          selectedValue={text}
          style={{
            height: 50,
            width: SIZES.width > 400 ? 250 : 180,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onValueChange={itemValue => handleChangeText(itemValue)}>
          {/* default displayed picker item */}
          <Picker.Item
            style={{fontSize: 13, color: 'gray'}}
            label="Please select an option..."
            value="0"
          />
          {/* rest of the user stored plate info are coming from mapPlatesData */}
          {mapPlatesData().map(item => (
            <Picker.Item
              key={item.key}
              style={{fontSize: 15, color: 'black'}}
              label={item.plate_no}
              value={item.plate_no}
            />
          ))}
        </Picker>
      </View>
      {/* Search Button to trigger search function */}
      <TouchableHighlight
        style={styles.searchBTN}
        // as son as user hits search button,
        //we set plateNo as selected picker item value(whathever value text has atm)
        onPress={() => {
          setPlateNo(text.toUpperCase());
          // getting owner start date (arac shaiplik baslangic tarihi)
          //from plate item that user has selected
          const date = mapPlatesData().filter(item => item.plate_no == text)[0]
            .owner_start_date;
          console.log('\ndate:', date);
          // parsing and reconstructing the date info into a format that passQuery api call accepts
          const date_final =
            date.substring(0, 4) +
            '-' +
            date.substring(4, 6) +
            '-' +
            date.substring(6, 8);

          console.log('date:', date_final);
          // setting it
          setOwnerDate(date_final);
          // set clicked true after all that so that based on status of clicked we can navigate user to passResults.js
          setClicked(true);
        }}>
        <Icon name="search" color={COLORS.white} size={18} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderRadius: 8,
    borderColor: COLORS.themeblue,
    paddingHorizontal: SIZES.double,
    borderWidth: 2,
    height: 50,
  },
  searchBTN: {
    borderRadius: 6,
    backgroundColor: COLORS.themeblue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 50,
    height: 50,
    left: SIZES.padding,
  },
});
