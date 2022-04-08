import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants/index';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderTabs from './HeaderTabs';

export default function Header(props) {
  const activeTab = props.activeTab;
  const setActiveTab = props.setActiveTab;

  return (
    <View style={{backgroundColor: COLORS.white, height: 180}}>
      <View style={{flexDirection: 'row', top: SIZES.padding * 2}}>
        {/* Settings Button */}
        <Icon
          name="setting"
          size={32}
          style={{
            position: 'absolute',
            left: SIZES.padding * 2,
            zIndex: 2,
          }}
          color={COLORS.neongreen}
          onPress={() => props.navigation.goBack()}
        />
        {/* Cancel Button */}
        <Icon
          name="close"
          size={28}
          style={{
            position: 'absolute',
            right: SIZES.padding * 2,
            zIndex: 2,
          }}
          color={'#333'}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      {/* Screen Name */}
      <View
        style={{
          top: 70,
          left: SIZES.padding * 2,
        }}>
        <Text style={styles.headerTitle}>Bildirimlerim</Text>
      </View>
      {/* Notif Categories */}
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    opacity: 0.85,
  },
});
