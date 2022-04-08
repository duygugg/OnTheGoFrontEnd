import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, SIZES} from '../../constants/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DebtPassContext} from '../../ContextProvider/DebtPassContext';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';

export default function SearchBar(props) {
  const [text, onChangeText] = React.useState();
  const {PassData, plateData} = React.useContext(DebtPassContext);
  const [plateNo, setPlateNo] = plateData;
  const [clicked,setClicked] = React.useState(false)
  
  const isFocused = useIsFocused();

  // Each time DebtPasses.js screen is loaded(which contains this component), we set the plateNo as Null
  //bc we want to display a blank search bar each time user interacts with the DebtPass screen
  useEffect(() => {
    setPlateNo(null); //retrieved from context so that we can share the plateNo state among all the other pages on need
    console.log('went back to screen:', plateNo,clicked);
  }, [isFocused]);

  useEffect(() => {
    console.log('searhc creen:', plateNo,clicked);
    // as soon as search bar button is clicked and plateNo state is updated with field value provided by user
    // navigate user to results page
    if(plateNo !==null && clicked){
      props.navigation.navigate('DebtPassResults');
    }
  }, [plateNo]);


  const handleSubmit = () => { 
    // setting plateNo and clicked state whenever user clicks on search bar button
    setPlateNo(text.toUpperCase());
    setClicked(true) //SEARCH BAR CLICKED
    
    //props.navigation.navigate('DebtPassResults');
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
        <TextInput
          placeholder="Lütfen plakanızı giriniz..."
          onChangeText={text => onChangeText(text)}
          value={text}
          style={{marginLeft: 10}}></TextInput>
      </View>
      {/* Search Button to trigger search function */}
      <TouchableHighlight
        style={styles.searchBTN}
        onPress={() => {
          handleSubmit();
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
    width: SIZES.width>400 ? '75%':'70%',
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
