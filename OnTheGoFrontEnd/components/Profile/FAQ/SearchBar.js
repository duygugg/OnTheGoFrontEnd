import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../../constants/index';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {SearchContext} from '../../../AuthContextProvider/SearchContext'
import {useIsFocused} from '@react-navigation/native';

export default function SearchBar() {
  const [text, onChangeText] = React.useContext(SearchContext);
  const isFocused = useIsFocused();

  // reset search bar text field each time user navigates to FAQ.js screen
  React.useEffect(() => {
    onChangeText('')
  },[isFocused])
  
  return (

    // main container
    <View
      style={{
        alignItems: 'center',
        marginTop: 20,
      }}>
        {/* searchbar container  */}
      <View style={styles.container}>
        {/* input field */}
        <TextInput
          style={styles.searchBarContainer}
          placeholder="Konu Ara"
          value={text}
          onChangeText={text => onChangeText(text)}
        />
        {/* search icon */}
        <FontAwesomeIcon
          icon={faSearch}
          color={'lightgray'}
          style={{
            padding: 12,
            left: (SIZES.width * 5) / 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '80%',
    borderRadius: 15,
  },
  searchBarContainer: {
    paddingLeft: 30,
    paddingVertical: 10,
    width: '80%',
  },
});
