import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/index';
import Button from '../../components/Registration/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TCKNForm(props) {
  const getFormCredentials = async () => {
    let items = await AsyncStorage.getItem('formCredentials');
    console.log('items:', items);
  };
  React.useEffect(() => {
    getFormCredentials();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Sign Up')}>
          <Icon name="left" size={30} color={COLORS.themeblue} />
        </TouchableOpacity>
        <Text style={[styles.title, {left: 10}]}>Create an Account</Text>
      </View>
      <Text style={styles.subText}>TCKN Information</Text>
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.65,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    color: COLORS.themeblue,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
    fontWeight: '500',
    padding: 20,
  },
});
