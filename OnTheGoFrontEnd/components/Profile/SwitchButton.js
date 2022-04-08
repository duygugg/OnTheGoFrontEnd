import {StyleSheet, Text, View, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';

import {COLORS, SIZES} from '../../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SwitchButton(props) {
  const isEnabledSMS = props.isEnabledSMS
  const setIsEnabledSMS = props.setIsEnabledSMS;
  const isEnabledEmail = props.isEnabledEmail
  const setIsEnabledEmail= props.setIsEnabledEmail;

  console.log("button:",isEnabledEmail, isEnabledSMS);


  const toggleSwitchSMS = async () => {
    setIsEnabledSMS(!isEnabledSMS);
  };

  const toggleSwitchEmail = async () => {
    setIsEnabledEmail(!isEnabledEmail);
  };

  const storeData = async (permission_type, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(permission_type, jsonValue);
    } catch (e) {
      // saving error
    }
  };


  useEffect(() => {
    storeData('SMSPermission', isEnabledSMS);
    console.log('sms change stored in async');
  }, [isEnabledSMS]);

  useEffect(() => {
    storeData('EmailPermission', isEnabledEmail);
    console.log('email change stored in async');
  }, [isEnabledEmail]);

  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 15}}>
      <Switch
        style={{transform: [{scaleX: 1.6}, {scaleY: 1.6}]}}
        trackColor={{false: '#767577', true: COLORS.neongreen}}
        thumbColor={
          props.text == 'SMS'
            ? isEnabledSMS
              ? 'white'
              : '#f4f3f4'
            : isEnabledEmail
            ? 'white'
            : '#f4f3f4'
        }
        ios_backgroundColor="#3e3e3e"
        onValueChange={
          props.text === 'SMS' ? toggleSwitchSMS : toggleSwitchEmail
        }
        value={props.text === 'SMS' ? isEnabledSMS : isEnabledEmail}
      />
      <Text
        style={{
          left: 20,
          textAlign: 'center',
          fontSize: 22,
          fontWeight: '400',
        }}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
