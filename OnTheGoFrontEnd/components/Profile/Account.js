import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {COLORS, SIZES} from '../../constants/index';
export default function Account(props) {

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(props.text);
      }}>
      <View
        style={{
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',

          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{paddingHorizontal: 20}}>
          <FontAwesomeIcon
            icon={props.icon}
            size={25}
            color={COLORS.darkgreen}
          />
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
