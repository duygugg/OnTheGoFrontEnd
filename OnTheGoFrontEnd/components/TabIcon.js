import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants';

export default function TabIcon({focused, iconName}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
      }}>
      <Icon
        name={iconName}
        size={22}
        style={{
          color: focused ? COLORS.neongreen : COLORS.light,
        }}
      />

      {focused && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 5,
            borderRadius:5,
            //borderTopRightRadius: 5,
            //borderTopLeftRadius: 5,
            backgroundColor: COLORS.neongreen,
          }}></View>
      )}
    </View>
  );
}


